import { h, Component } from "preact";
import { Modal } from "../util/modal";
import { ResolveData } from "./ResolveData";
import { maxLength } from "../util/strings";

export interface KeyValueClasses {
  div?: string;
  key?: string;
  val?: string;
}

export interface IKeyValueRowProps {
  classes: KeyValueClasses;
  modalTitle: string;
  tuple: { key: string, val: any };
}

export class KeyValueRow extends Component<IKeyValueRowProps, {}> {
  render() {
    const { tuple: { key, val }, classes, modalTitle } = this.props;
    const showModal = () =>
        Modal.show(modalTitle, key, val, ResolveData);

    const renderValue = () => {
      if (val === undefined)                  return <span className="uirTranVis_code">undefined</span>;
      if (val === null)                       return <span className="uirTranVis_code">null</span>;
      if (typeof val === 'string')            return <span className="uirTranVis_code">"{maxLength(100, val)}"</span>;
      if (typeof val === 'number')            return <span className="uirTranVis_code">{val.toString()}</span>;
      if (typeof val === 'boolean')           return <span className="uirTranVis_code">{val.toString()}</span>;
      if (Array.isArray(val))                 return <span className="link" onClick={showModal}>[Array]</span>;
      if (typeof val === 'object')            return <span className="link" onClick={showModal}>[Object]</span>;
      if (typeof val.toString === 'function') return <span>{maxLength(100, val.toString())}</span>;
    };

    return (
        <div className={classes.div}>
          <div className={classes.key}>{key}:</div>
          <div className={classes.val}>{renderValue()}</div>
        </div>
    )
  }
}

interface Bucket {
  label: string;
  is: (val) => boolean;
  value?: any;
  count: number;
  data: { [key: string]: any };
}

export interface IGroupDefinition {
  value: any;
  label: string;
}

export interface IKeysAndValuesProps {
  data: any;
  classes: KeyValueClasses;
  modalTitle?: string;
  groupedValues?: IGroupDefinition[];
  enableGroupToggle?: boolean;
}

export interface IKeysAndValuesState {
  collapseFalsy: boolean;
}

export class KeysAndValues extends Component<IKeysAndValuesProps, IKeysAndValuesState> {
  public static falsyGroupDefinitions: IGroupDefinition[] = [
    { value: undefined, label: 'undefined' },
    { value: null, label: 'null' },
    { value: '', label: 'empty string' },
  ];
  state = { collapseFalsy: true };

  private makeBuckets(definitions: IGroupDefinition[], data: { [key: string]: any }): Bucket[] {
    const makeBucket = (def: IGroupDefinition): Bucket => ({
      label: def.label,
      is: (val) => val === def.value,
      value: def.value,
      count: 0,
      data: {},
    });

    let defaultBucket = {
      label: 'default',
      is: () => true,
      count: 0,
      data: {},
    };

    const buckets = definitions.map(makeBucket).concat(defaultBucket);

    Object.keys(data).forEach(key => {
      const bucket = buckets.find(bucket => bucket.is(data[key]));
      bucket.data[key] = data[key];
      bucket.value = data[key];
      bucket.count++;
    });

    return buckets;
  }

  render() {
    const { data, classes, modalTitle } = this.props;

    const groupedValues = this.props.groupedValues || KeysAndValues.falsyGroupDefinitions;
    const enableGroupToggle = this.props.enableGroupToggle || false;

    const isCollapsed = this.state.collapseFalsy;

    const buckets: Bucket[] = this.makeBuckets(groupedValues, data);
    const defaultBucket = buckets.find(bucket => bucket.label === 'default');
    const groupedBuckets = buckets.filter(bucket => !!bucket.count && bucket !== defaultBucket);
    const groupedCount = groupedBuckets.reduce((total, bucket) => total += bucket.count, 0);

    const tuples = Object.keys(defaultBucket.data).map(key => ({ key, val: defaultBucket.data[key] }));
    const groupedTuples = groupedBuckets.map(bucket => {
      const key = Object.keys(bucket.data).sort().join(', ');
      const val = bucket.value;
      return { key, val };
    });

    const showGroupToggle = enableGroupToggle && groupedCount > 1;

    return (
        <div className="uirTranVis_keysAndValues">
          {tuples.map(tuple => (
              <KeyValueRow key={tuple.key} tuple={tuple} classes={classes} modalTitle={modalTitle} />
          ))}

          {showGroupToggle && !!groupedTuples.length && (
              <a
                  href="javascript:void(0)"
                  onClick={() => this.setState({ collapseFalsy: !isCollapsed })}
                  className="uirTranVis_keyValue"
              >
                {isCollapsed ? 'show' : 'hide'} {groupedCount} {groupedBuckets.map(bucket => bucket.label).join(' or ')} parameter values
              </a>
          )}

          {(!showGroupToggle || !this.state.collapseFalsy) && (
              groupedTuples.map(tuple => (
                  <KeyValueRow key={tuple.key} tuple={tuple} classes={classes} modalTitle={modalTitle}/>
              ))
          )}
        </div>
    );
  }
}
