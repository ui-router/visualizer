# UI-Router State Visualizer and Transition Visualizer

Try the [Demo plunker](http://plnkr.co/edit/MZ7ypavytxD1Ty1UHozo?p=info)

![Image of Visualizer](https://pbs.twimg.com/media/Cn7epJ_UMAAHWqu.jpg)

## What

Visualizes the state tree and transitions in UI-Router 1.0+.

This script augments your app with two components:

1) State Visualizer: Your UI-Router state tree, showing the active state and its active ancestors (green nodes)

2) Transition Visualizer: A list of each transition (from one state to another)

   - Color coded transition status (success/error/ignored/redirected)
   - Shows which states were retained during the transition, which were exited, and which were entered.
   - Shows parameter values
   - Shows resolve data

## How

This script is distributed as a UMD module.
There are two ways to add this to your application:

### Using a script tag

-   Add a script tag to your HTML.
    The visualizer will be added to the window as `window['ui-router-visualizer']`.

    ```
    <script src="//unpkg.com/ui-router-visualizer@2"></script>
    ```

-   Create the visualizer:

    ### Angular 1

    Inject the `ng1UIRouter` router instance in a run block.
    Get the `ui-router-visualizer` off the window and pass it the router instance.

    Note: in ui-router 1.0.0-beta.2 and above, `ng1UIRouter` is renamed to `$uiRouter`

    ```js
    // inject the router instance by name
    app.run(function($uiRouter) {
     var vis = window['ui-router-visualizer'];
     vis.visualizer($uiRouter);
    });
    ```

    ### Angular 2

    Get the `ui-router-visualizer` off the window.
    Pass the router instance to the visualizer in the `configure` method of your UIRouterConfig.

    ```js
    @Injectable()
    export class MyUIRouterConfig {
      constructor(router: UIRouter) {
        var vis = window['ui-router-visualizer'];
        vis.visualizer(router);
      }
    }
    
    ... 
    @NgModule({
      imports: [ UIRouterModule.forRoot({ configClass: MyUIRouterConfig }) ]
      ...
    ```

    ### React

    Bootstrap UI-Router by calling `new UIRouterReact();`
    Pass the instance to the visualizer.

    ```js
    var vis = window['ui-router-visualizer'];
    let router = new UIRouterReact();

    // register states here
    // ...

    vis.visualizer(router);
    router.start();
    ```


### Using a module loader/bundler like webpack

-   Configure your bundler to load ui-router-visualizer.
    The visualizer will be available `'ui-router-visualizer'`.

-   Create the visualizer:

    ### Angular 1

    Get the `ui-router-visualizer` using `require` or ES6 `import`.
    Inject the `ng1UIRouter` router instance in a run block.
    Provide the router instance to the visualizer.

    Note: in ui-router 1.0.0-beta.2 and above, `ng1UIRouter` is renamed to `$uiRouter`

    ```js
    import * as vis from 'ui-router-visualizer';
    // or: var vis = require('ui-router-visualizer');

    // inject the router instance by name
    app.run(function(ng1UIRouter) {
     vis.visualizer(ng1UIRouter);
    });
    ```

    ### Angular 2

    Get the `ui-router-visualizer` using `require` or ES6 `import`.
    Pass the router instance to the visualizer in the `configure` method of your UIRouterConfig.

    ```js
    import * as vis from 'ui-router-visualizer';
    // or: var vis = require('ui-router-visualizer');

    @Injectable()
    export class MyUIRouterConfig {
      constructor(router: UIRouter) {
        vis.visualizer(router);
      }
    }
    
    ... 
    @NgModule({
      imports: [ UIRouterModule.forRoot({ configClass: MyUIRouterConfig }) ]
      ...
    ```

    ### React

    Get the `ui-router-visualizer` using `require` or ES6 `import`.
    Bootstrap UI-Router by calling `new UIRouterReact();`
    Pass the instance to the visualizer.

    ```js
    import * as vis from 'ui-router-visualizer';
    // or: var vis = require('ui-router-visualizer');

    let router = new UIRouterReact();

    // register states here
    // ...

    vis.visualizer(router);
    router.start();
    ```


