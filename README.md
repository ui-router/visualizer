# UI-Router State Visualizer and Transition Visualizer

Try the [Demo plunker](http://plnkr.co/edit/MZ7ypavytxD1Ty1UHozo?p=info)

![Image of Visualizer](https://pbs.twimg.com/media/Cn7epJ_UMAAHWqu.jpg)

## What

Visualizes the state tree and transitions in UI-Router 1.0+.

This script augments your app with two components:

1) State Visualizer: Your UI-Router state tree, showing the active state and its active ancestors (green nodes)
   - Clicking a state will transition to that state.
   - If your app is large, state trees can be collapsed by double-clicking a state.
   - Supports different layouts and zoom. 

2) Transition Visualizer: A list of each transition (from one state to another)

   - Color coded Transition status (success/error/ignored/redirected)
   - Hover over a Transition to show which states were entered/exited, or retained during the transition.
   - Click the Transition to see details (parameter values and resolve data)

## How

The Visualizer is a UI-Router plugin.
Register the plugin with the `UIRouter` object.

### Locate the Plugin

-  Using a `<script>` tag

    Add the script as a tag in your HTML.

    ```html
    <script src="//unpkg.com/ui-router-visualizer@3"></script>
    ```
    
    The visualizer Plugin can be found (as a global variable) on the window object.
    
    ```js
    var Visualizer = window['ui-router-visualizer'].Visualizer;
    ```
    
-  Using `require` or `import` (SystemJS, Webpack, etc)

    Add the npm package to your project
    
    ```
    npm install --save ui-router-visualizer
    ```
    
    - Use `require` or ES6 `import`:
    
    ```js
    var Visualizer = require('ui-router-visualizer').Visualizer;
    ```
    
    ```js
    import { Visualizer } from 'ui-router-visualizer';
    ```

### Register the plugin

First get a reference to the `UIRouter` object instance.
This differs by framework (AngularJS, Angular, React, etc. See below for details).

After getting a reference to the `UIRouter` object, register the `Visualizer` plugin

```js
var pluginInstance = uiRouterInstance.plugin(Visualizer);
```

---

# &nbsp;

---

### Getting a reference to the `UIRouter` object

#### Angular 1

Inject the `$uiRouter` router instance in a run block.

```js
// inject the router instance into a `run` block by name
app.run(function($uiRouter) {
 var pluginInstance = $uiRouter.plugin(Visualizer);
});
```

#### Angular 2

Use a config function in your root module's `UIRouterModule.forRoot()`.
The router instance is passed to the config function.

```js
import { Visualizer } from "ui-router-visualizer";

...

export function configRouter(router: UIRouter) {  
  var pluginInstance = router.plugin(Visualizer);
}

...

@NgModule({
  imports: [ UIRouterModule.forRoot({ config: configRouter }) ]
  ...
```

#### React (Imperative)

    
Create the UI-Router instance manually by calling `new UIRouterReact();`

```js
var Visualizer = require('ui-router-visualizer').Visualizer;
var router = new UIRouterReact();
var pluginInstance = router.plugin(Visualizer);
```

#### React (Declarative)
    
Add the plugin to your `UIRouter` component

```js
var Visualizer = require('ui-router-visualizer').Visualizer;

...
render() {
  return <UIRouter plugins=[Visualizer]></UIRouter>
}
```
