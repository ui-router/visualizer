module.exports = {
    entry: "./src/statevis.ts",

    output: {
        path: __dirname + "/build",
        publicPath: "/build/",
        filename: "visualizer.js",
        libraryTarget: "umd",
        library: "ui-router-visualizer",
        umdNamedDefine: true
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader', tsconfig: 'tsconfig.json' }
        ]
    },

    externals: {
        angular: { root: 'angular', amd: 'angular', commonjs2: 'angular', commonjs: 'angular' },
        "angular-ui-router": { root: 'angular-ui-router', amd: 'angular-ui-router', commonjs2: 'angular-ui-router', commonjs: 'angular-ui-router' },
    }
};
