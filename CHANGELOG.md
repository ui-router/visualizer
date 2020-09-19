## 7.2.1 (2020-09-19)
[Compare `@uirouter/visualizer` versions 7.2.0 and 7.2.1](https://github.com/ui-router/visualizer/compare/7.2.0...7.2.1)

### Bug Fixes

* Pin d3-interpolate to 1.4.0 to avoid bundling an arrow function for IE11 compat ([1f4a926](https://github.com/ui-router/visualizer/commit/1f4a926))




# 7.2.0 (2020-09-16)
[Compare `@uirouter/visualizer` versions 7.1.0 and 7.2.0](https://github.com/ui-router/visualizer/compare/7.1.0...7.2.0)

### Features

* **StateVisualizer:** Support customization of state node labels ([d3cfd6e](https://github.com/ui-router/visualizer/commit/d3cfd6e))




# 7.1.0 (2020-09-15)
[Compare `@uirouter/visualizer` versions 7.0.0 and 7.1.0](https://github.com/ui-router/visualizer/compare/7.0.0...7.1.0)

### Bug Fixes

* fix classnames ([4d5fb1a](https://github.com/ui-router/visualizer/commit/4d5fb1a))
* Fix disposing of the state visualizer ([7fc2ba8](https://github.com/ui-router/visualizer/commit/7fc2ba8))
* Fix z-index of minimized state visualizer ([8d3e9e3](https://github.com/ui-router/visualizer/commit/8d3e9e3))
* **statevis:** add documentation on how to use the options on the state visualizer and fix the node classes not being appended correctly ([#199](https://github.com/ui-router/visualizer/issues/199)) ([eda9657](https://github.com/ui-router/visualizer/commit/eda9657))


### Features

* Switch bundle from webpack to rollup and emit new esm bundle ([c4444db](https://github.com/ui-router/visualizer/commit/c4444db))
* **statevis:** allow nodes to be styled by custom classes ([#197](https://github.com/ui-router/visualizer/issues/197)) ([b8f0ef6](https://github.com/ui-router/visualizer/commit/b8f0ef6))
* **update_dependencies:** Add a repository_dispatch trigger ([8b0f88a](https://github.com/ui-router/visualizer/commit/8b0f88a))




# 7.0.0 (2019-01-26)
[Compare `@uirouter/visualizer` versions 6.0.3 and 7.0.0](https://github.com/ui-router/visualizer/compare/6.0.3...7.0.0)

### Bug Fixes

* **typescript:** Create an artisinal hand crafted typings file for better compat with react ([055e50c](https://github.com/ui-router/visualizer/commit/055e50c))




## 6.0.3 (2019-01-25)
[Compare `@uirouter/visualizer` versions 6.0.2 and 6.0.3](https://github.com/ui-router/visualizer/compare/6.0.2...6.0.3)



## 6.0.2 (2018-07-17)
[Compare `@uirouter/visualizer` versions 6.0.0 and 6.0.2](https://github.com/ui-router/visualizer/compare/6.0.0...6.0.2)



## 6.0.1 (2018-07-17)

[Compare `@uirouter/visualizer` versions 6.0.0 and 6.0.1](https://github.com/ui-router/visualizer/compare/6.0.0...6.0.1)

# 6.0.0 (2018-02-14)

[Compare `@uirouter/visualizer` versions 5.1.3 and 6.0.0](https://github.com/ui-router/visualizer/compare/5.1.3...6.0.0)

### Bug Fixes

- **css:** Add 'nonce' attribute to style-loader to prevent CSP violations due to inline styles ([#43](https://github.com/ui-router/visualizer/issues/43)) ([c137ef2](https://github.com/ui-router/visualizer/commit/c137ef2))
- **example:** use window['[@uirouter](https://github.com/uirouter)/visualizer'](<[5e1b228](https://github.com/ui-router/visualizer/commit/5e1b228)>)

### Features

- **bundle:** Rename UMD name from `ui-router-visualizer` to `[@uirouter](https://github.com/uirouter)/visualizer` for consistency ([7b7b9d6](https://github.com/ui-router/visualizer/commit/7b7b9d6))

### BREAKING CHANGES

- **bundle:** UMD name renamed from `ui-router-visualizer` to `@uirouter/visualizer`.
  This will affect people who add the visualizer using script tags, instead of a bundler.

```
var Visualizer = window['@uirouter/visualizer'];
router.plugin(Visualizer);
```

## 5.1.3 (2018-01-04)

[Compare `@uirouter/visualizer` versions 5.1.2 and 5.1.3](https://github.com/ui-router/visualizer/compare/5.1.2...5.1.3)

### Bug Fixes

- **statevis:** Make minimized statevis z-index higher than transition vis so it can be clicked. ([ebef40b](https://github.com/ui-router/visualizer/commit/ebef40b))

## 5.1.2 (2018-01-03)

[Compare `@uirouter/visualizer` versions 5.1.1 and 5.1.2](https://github.com/ui-router/visualizer/compare/5.1.1...5.1.2)

### Features

- **transitionvis:** sort parameter names when grouping identical valued parameters together ([ff124d9](https://github.com/ui-router/visualizer/commit/ff124d9))

## 5.1.1 (2018-01-03)

[Compare `@uirouter/visualizer` versions 5.1.0 and 5.1.1](https://github.com/ui-router/visualizer/compare/5.1.0...5.1.1)

### Bug Fixes

- **transitionvis:** Fix style on arrow so it takes up entire vertical space of its state block ([9863eda](https://github.com/ui-router/visualizer/commit/9863eda))

# 5.1.0 (2018-01-03)

[Compare `@uirouter/visualizer` versions 5.0.6 and 5.1.0](https://github.com/ui-router/visualizer/compare/5.0.6...5.1.0)

### Bug Fixes

- **css:** Switch to using px instead of em. Pass sizes to svg icons. ([fc38027](https://github.com/ui-router/visualizer/commit/fc38027))
- **statevis:** Fix null dereference in ref callback ([1711525](https://github.com/ui-router/visualizer/commit/1711525))
- **statevis:** Remove console.log leftover ([#41](https://github.com/ui-router/visualizer/issues/41)) ([a0f54a9](https://github.com/ui-router/visualizer/commit/a0f54a9))

### Features

- **transitionvis:** Collapse multiple null/undefined/empty string parameter values, add show/hide toggle. Improve styling and flexbox layouts. Refactor key/value components. ([d0af65a](https://github.com/ui-router/visualizer/commit/d0af65a))
- **transitionvis:** switch all styles to px, add preformatted param values, fix some flexbox issues. ([6b5e04f](https://github.com/ui-router/visualizer/commit/6b5e04f))

## 5.0.6 (2017-12-03)

[Compare `@uirouter/visualizer` versions 5.0.5 and 5.0.6](https://github.com/ui-router/visualizer/compare/5.0.5...5.0.6)

### Bug Fixes

- **bundle:** fix bundling of css for lib-esm (stackblitz try 5) bundle css files? ([9e1c21c](https://github.com/ui-router/visualizer/commit/9e1c21c))

## 5.0.5 (2017-12-03)

[Compare `@uirouter/visualizer` versions 5.0.4 and 5.0.5](https://github.com/ui-router/visualizer/compare/5.0.4...5.0.5)

### Bug Fixes

- **bundle:** fix bundling of css for lib-esm (stackblitz try 4) disable ([1803612](https://github.com/ui-router/visualizer/commit/1803612))

## 5.0.4 (2017-12-02)

[Compare `@uirouter/visualizer` versions 5.0.3 and 5.0.4](https://github.com/ui-router/visualizer/compare/5.0.3...5.0.4)

### Bug Fixes

- **bundle:** fix bundling of css for lib-esm (stackblitz try 3) ([9fe1988](https://github.com/ui-router/visualizer/commit/9fe1988))

## 5.0.3 (2017-12-02)

[Compare `@uirouter/visualizer` versions 5.0.2 and 5.0.3](https://github.com/ui-router/visualizer/compare/5.0.2...5.0.3)

### Bug Fixes

- **bundle:** fix bundling of css for lib-esm (stackblitz try 2) ([0b6f561](https://github.com/ui-router/visualizer/commit/0b6f561))

## 5.0.2 (2017-12-02)

[Compare `@uirouter/visualizer` versions 5.0.1 and 5.0.2](https://github.com/ui-router/visualizer/compare/5.0.1...5.0.2)

### Bug Fixes

- **bundle:** externalize uirouter/core ([7732b81](https://github.com/ui-router/visualizer/commit/7732b81))
- **bundle:** fix bundling of css for lib-esm (stackblitz) ([39c641d](https://github.com/ui-router/visualizer/commit/39c641d))
- **example:** fix 'npm start' bundle reference ([0a798a9](https://github.com/ui-router/visualizer/commit/0a798a9))

## 5.0.1 (2017-12-02)

[Compare `@uirouter/visualizer` versions 5.0.0 and 5.0.1](https://github.com/ui-router/visualizer/compare/5.0.0...5.0.1)

### Bug Fixes

- **ie:** Do not use MutationObserver if it doesn't exist ([95ad3a1](https://github.com/ui-router/visualizer/commit/95ad3a1))
- **statevis:** do not allow drag when minimized ([e1742d1](https://github.com/ui-router/visualizer/commit/e1742d1))
- **statevis:** fix canceling of auto-minimize by hovering mouse ([3b6b46a](https://github.com/ui-router/visualizer/commit/3b6b46a))
- **statevis:** fix resize event handling ([eae605a](https://github.com/ui-router/visualizer/commit/eae605a))

### Features

- **statevis:** improve layout of vis controls; add close button. ([0d97161](https://github.com/ui-router/visualizer/commit/0d97161))
- **transitionvis:** collapse undefined param/resolves into single row. Hide $state$ resolve. ([1710d10](https://github.com/ui-router/visualizer/commit/1710d10))

# 5.0.0 (2017-10-22)

[Compare `@uirouter/visualizer` versions 4.0.2 and v5.0.0](https://github.com/ui-router/visualizer/compare/4.0.2...v5.0.0)

### Features

- **bundles:** Use regular ui-router style: \_bundles lib and lib-esm dirs ([d68ce15](https://github.com/ui-router/visualizer/commit/d68ce15))

### BREAKING CHANGES

- **bundles:** Moved bundles to \_bundles and renamed bundle. Stopped committing bundles directory to git tags
