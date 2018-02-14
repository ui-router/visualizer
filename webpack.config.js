var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: "./src/visualizer.ts",
  entry: {
    "ui-router-visualizer": ["./src/visualizer.ts"],
    "ui-router-visualizer.min": ["./src/visualizer.ts"]
  },

  output: {
    path: path.resolve(__dirname, "_bundles"),
    publicPath: "/_bundles/",
    filename: "[name].js",
    libraryTarget: "umd",
    library: "@uirouter/visualizer",
    umdNamedDefine: true
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  plugins: [
    new ForkTsCheckerWebpackPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minify: true,
      sourceMap: true,
      compress: { warnings: false },
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new CopyWebpackPlugin([{ from: 'src/**/*.css', flatten: true }]),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader', options: { transpileOnly: true } },
      { test: /\.css$/, loader: [
        { loader: 'style-loader', options: { hmr: false, attrs: { nonce: "uiroutervisualizer" } } },
        { loader: 'css-loader?sourceMap-loader' },
      ] },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ]
  },

  externals: ['@uirouter/core'],
};
