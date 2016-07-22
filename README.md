# UI-Router State Visualizer and Transition Visualizer

Try the [Demo plunker](http://plnkr.co/edit/MZ7ypavytxD1Ty1UHozo?p=info)

This script is distributed as a UMD module.
There are two ways to add this to your application:

## Using a script tag

-   Add a script tag to your HTML.
    Add the font-awesome stylesheet.
    The visualizer will be added to the window as `window['ui-router-visualizer']`.

    ```
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.css" />
    <script src="//npmcdn.com/ui-router-visualizer@2"></script>
    ```

-   Create the visualizer:

    ### Angular 1

    Inject the `ng1UIRouter` router instance in a run block.
    Get the `ui-router-visualizer` off the window and pass it the router instance.

    Note: in ui-router 1.0.0-beta.2 and above, `ng1UIRouter` is renamed to `$uiRouter`

    ```js
    // inject the router instance by name
    app.run(function(ng1UIRouter) {
     var vis = window['ui-router-visualizer'];
     vis.visualizer(ng1UIRouter);
    });
    ```

    ### Angular 2

    Get the `ui-router-visualizer` off the window.
    Pass the router instance to the visualizer in the `configure` method of your UIRouterConfig.

    ```js
    export class MyUIRouterConfig extends UIRouterConfig {
      configure(router) {
        var vis = window['ui-router-visualizer'];
        vis.visualizer(router);
      }
    }
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


## Using a module loader/bundler like webpack

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

    export class MyUIRouterConfig extends UIRouterConfig {
      configure(router) {
        vis.visualizer(router);
      }
    }
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


