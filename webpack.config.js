module.exports = {
    entry: "./build/src/statevis.js",

    output: {
        path: __dirname + "/build",
        filename: "visualizer.js",
        libraryTarget: "umd",
        library: "ui-router-visualizer",
        umdNamedDefine: true
    },

    resolve: {
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },

    externals: {
        angular: { root: 'angular', amd: 'angular', commonjs2: 'angular', commonjs: 'angular' },
        "angular-ui-router": { root: 'angular-ui-router', amd: 'angular-ui-router', commonjs2: 'angular-ui-router', commonjs: 'angular-ui-router' },
    }
};
