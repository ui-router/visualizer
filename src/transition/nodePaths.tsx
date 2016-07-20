import * as React from "react";
import {NodeDetail} from "./nodeDetail";

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
  paths: TransStruct[];
}

export class NodePaths extends React.Component<IProps, IState> {
  state = { paths: [] };

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

    let paths: TransStruct[] = tcPaths.retained
        .map((node, idx) => ({key: key('retained', 'retained', idx), to: node, toType: 'retain', from: node, fromType: 'retain'}));

    let maxPathLength = Math.max(tcPaths.exiting.length, tcPaths.entering.length);
    for (let i = 0; i < maxPathLength; i++) {
      paths.push({
        key: key('exiting', 'entering', i),
        to: tcPaths.entering[i],
        toType: tcPaths.entering[i] && 'enter',
        from: tcPaths.exiting[i],
        fromType: tcPaths.exiting[i] && 'exit'
      });
    }

    this.setState({ paths });
  }

  render() {
    return (
      <table className="paths">
        <thead>
          <tr><th>From Path</th><th>To Path</th></tr>
        </thead>

        <tbody>
        { (this.state.paths || []).map(elem =>
            <tr key={elem.key}>
              <NodeDetail node={elem.from} type={elem.fromType} />
              <NodeDetail node={elem.to} type={elem.toType} />
            </tr>
        ) }
        </tbody>
      </table>
    )
  }
}
