module.exports = {
    entry: ["./src/statevis.ts", "./example/app.ts"],

    output: {
        path: __dirname + "/example",
        filename: "bundle.js"
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};
