let barTemplate = `
    <h1>bar state loaded</h1>
    <ul><li ng-repeat="bar in $ctrl.barData">{{bar}}</li></ul>
    <div ui-view></div>
`;

export class barController { }

const Bar = {
  template: barTemplate,
  controller: barController,
  bindings: { barData: "<" }
};

export default Bar;