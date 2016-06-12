let fooTemplate = `
    <h1>foo state loaded</h1>
    <ul><li ng-repeat="foo in $ctrl.fooData">{{foo}}</li></ul>
    <div ui-view></div>
`;

export class FooController { }


const Foo = {
  template: fooTemplate,
  controller: FooController,
  bindings: { fooData: "<" }
}

export default Foo;