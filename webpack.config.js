module.exports = {
    entry: "./build/src/statevis.js",

    output: {
        path: __dirname + "/build",
        filename: "visualizer.js",
        libraryTarget: "umd",
        library: "ui.router.statevis",
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
        angular: { root: 'angular', commonjs2: 'angular', commonjs: 'angular' }
    }
};
