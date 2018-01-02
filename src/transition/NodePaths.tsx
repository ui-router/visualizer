import { h, render, Component } from "preact";
import {NodeDetail} from "./NodeDetail";
import {FlowArrow} from "./FlowArrow";

export interface TransStruct {
  key: string;
  to: any;
  toType: string;
  from: any;
  fromType: string;
}

export interface IProps {
  transition: any;
}

export interface IState {
  retained: TransStruct[];
  enterExit: TransStruct[];
}

export class NodePaths extends Component<IProps, IState> {
  state = {
    retained: [],
    enterExit: []
  };

  componentDidMount() {
    let trans = this.props.transition;
    let tcPaths = Object.assign({}, trans.treeChanges());

    // Ignore the root state when drawing paths.
    ["entering", "exiting", "retained"]
        .forEach(key => tcPaths[key] = tcPaths[key].filter(node => !!node.state.name));

    const partialKey = (pathname, idx) => {
      let node = tcPaths[pathname][idx];
      return node ? node.state.name : "";
    };

    const key = (pathname1, pathname2, idx) =>
        `${trans.$id}.${partialKey(pathname1, idx)}-${partialKey(pathname2, idx)}`;

    let retained: TransStruct[] = tcPaths.retained
        .map((node, idx) => ({key: key('retained', 'retained', idx), to: node, toType: 'retain', from: node, fromType: 'retain'}));
    let enterExit: TransStruct[] = [];

    let maxPathLength = Math.max(tcPaths.exiting.length, tcPaths.entering.length);
    for (let i = 0; i < maxPathLength; i++) {
      enterExit.push({
        key: key('exiting', 'entering', i),
        to: tcPaths.entering[i],
        toType: tcPaths.entering[i] && 'enter',
        from: tcPaths.exiting[i],
        fromType: tcPaths.exiting[i] && 'exit'
      });
    }

    this.setState({ retained, enterExit });
  }

  render() {
    var height = 2000;
    var retained = this.state.retained || [];
    var enterExit = this.state.enterExit || [];
    var lastEnterIdx = enterExit.filter(x => !!x.toType).length - 1;

    return (
        <table className="uirTranVis_paths">
          <thead>
          <tr>
            <th>From Path</th>
            <th>To Path</th>
          </tr>
          </thead>

          <tbody>

          { // Render the retained states
            retained.map(elem =>
                <tr key={elem.key}>
                  <td className={elem.fromType} colSpan={2}>
                    <NodeDetail trans={this.props.transition} node={elem.from} type={elem.fromType}/>
                  </td>
                </tr>
            ) }

          { // Render the entered/exited states
            enterExit.map((elem, idx) =>
                <tr key={elem.key}>
                  <td colSpan={2}>
                    <div className="uirTranVis_Row">
                      <div className={`${elem.fromType}`}>
                        { !elem.fromType ? null :
                            <div className="uirTranVis_nodeContent">
                              <NodeDetail trans={this.props.transition} node={elem.from} type={elem.fromType}/>
                              <FlowArrow
                                  bottom='V'
                                  top={idx ? 'V' : elem.toType ? 'RU' : 'AU'}
                              />
                            </div>
                        }
                      </div>

                      <div className={`${elem.toType}`}>
                        { !elem.toType ? null :
                            <div className="uirTranVis_nodeContent">
                              <FlowArrow
                                  top={idx ? 'V' : elem.fromType ? 'RD' : 'V'}
                                  bottom={idx == lastEnterIdx ? 'AD' : 'V'}
                              />
                              <NodeDetail trans={this.props.transition} node={elem.to} type={elem.toType}/>
                            </div>
                        }
                      </div>
                    </div>
                  </td>
                </tr>
            ) }
          </tbody>
        </table>
    )
  }
}

