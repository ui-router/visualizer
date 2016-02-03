import {app} from "../statevis.module";

app.directive('uirStateVisContainer', uirStateVisService => ({
  restrict: 'E',
  controllerAs: 'vm',
  controller: function($element) {
    //$element = $element.children();
    let el = $element[0].children[0];

    this.minimize = (evt?) => {
      evt && evt.preventDefault();
      evt && evt.stopPropagation();

      let bounds = el.getBoundingClientRect();
      el.style.top = el.style.left = "auto";
      el.style.right = this.right = (window.innerWidth - bounds.right);
      el.style.bottom = this.bottom = (window.innerHeight - bounds.bottom);

      let unminimize = () => {
        el.style.top = el.style.left = "auto";
        el.style.right = this.right;
        el.style.bottom = this.bottom;
        $element.children().toggleClass("minimized", false);
        $element.off("click", unminimize);
        this.minimized = false;
      };

      $element.children().toggleClass("minimized", true);
      $element.on("click", unminimize);
      // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
      setTimeout(() => el.style.right = el.style.bottom = "0", 50);

      this.minimized = true;
    };

    setTimeout(() => this.minimize(), 1000)
  },
  template: `
    <div class="uirStateVisContainer" draggable="!vm.minimized">
      <div style="width: 100%; display: flex; flex-flow: row nowrap; justify-content: space-between">
        <div> Current State: <state-selector></state-selector></div>
        <button ng-click="vm.minimize($event)"><i class="fa fa-chevron-down" style="cursor: pointer"></i></button>
      </div>
      <uir-state-vis style="flex: 1 0 auto" class="statevis" width="350" height="250"></uir-state-vis>
    </div>
`
}));

