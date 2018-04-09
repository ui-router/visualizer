import { h, render, Component } from 'preact';

export interface IProps {
  top: string;
  bottom: string;
}
export class FlowArrow extends Component<IProps, any> {
  height = 1000;

  renderCurve = () => (
    <path
      stroke="white"
      stroke-width="20"
      fill="none"
      d={`M50 ${this.height} V 70 Q50 20, 100 20 Q150 20, 150 70 V ${this.height}`}
    />
  );

  renderVerticalLine = () => (
    <svg viewBox={`0 70 100 ${this.height - 70}`} className="flowArrowSvg">
      {this.renderCurve()}
    </svg>
  );

  renderCurveRU = () => (
    <svg viewBox={`0 0 100 ${this.height}`} className="flowArrowSvg top">
      {this.renderCurve()}
    </svg>
  );

  renderCurveRD = () => (
    <svg viewBox={`100 0 100 ${this.height}`} className="flowArrowSvg top">
      {this.renderCurve()}
    </svg>
  );

  renderArrowU = () => (
    <svg viewBox={`0 0 100 ${this.height}`} className="flowArrowSvg top">
      <path stroke="white" stroke-width="20" fill="none" d={`M50 ${this.height} V 20 `} />
      <polygon fill="white" stroke="white" stroke-width="20" points="50,20 35,40 65,40" />
    </svg>
  );

  renderArrowD = () => (
    <svg viewBox={`0 0 100 ${this.height}`} className="flowArrowSvg bottom">
      <path stroke="white" stroke-width="20" fill="none" d={`M50 0 V ${this.height - 20}`} />
      <polygon
        fill="white"
        stroke="white"
        stroke-width="20"
        points={`50,${this.height - 20} 35,${this.height - 40} 65,${this.height - 40}`}
      />
    </svg>
  );

  render() {
    const renderSvg = type => {
      switch (type) {
        case 'V':
          return this.renderVerticalLine();
        case 'RU':
          return this.renderCurveRU();
        case 'RD':
          return this.renderCurveRD();
        case 'AU':
          return this.renderArrowU();
        case 'AD':
          return this.renderArrowD();
        default:
          return null;
      }
    };

    return (
      <div className="flowArrowCell">
        <div style={{ overflow: 'hidden', position: 'relative', flex: '1' }}>{renderSvg(this.props.top)}</div>

        <div style={{ overflow: 'hidden', position: 'relative', flex: '1' }}>{renderSvg(this.props.bottom)}</div>
      </div>
    );
  }
}
