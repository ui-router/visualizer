module.exports = {
    entry: "./src/visualizer.ts",

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
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader', tsconfig: 'tsconfig.json' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

        ]
    },

    externals: {
        // 'd3': { root: 'd3', amd: 'd3', commonjs2: 'd3', commonjs: 'd3' },
        // 'react': { root: 'react', amd: 'react', commonjs2: 'react', commonjs: 'react' },
        // 'react-dom': { root: 'react-dom', amd: 'react-dom', commonjs2: 'react-dom', commonjs: 'react-dom' }
    }
};
