var webpack = require('webpack');

module.exports = {
  entry: "./src/visualizer.ts",

  output: {
    path: __dirname + "/bundles",
    publicPath: "/bundles/",
    filename: "visualizer.min.js",
    libraryTarget: "umd",
    library: "ui-router-visualizer",
    umdNamedDefine: true
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader?noEmit=true', tsconfig: 'tsconfig.json'},
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }

    ]
  },

  externals: {
    // 'd3': { root: 'd3', amd: 'd3', commonjs2: 'd3', commonjs: 'd3' },
    // 'react': { root: 'react', amd: 'react', commonjs2: 'react', commonjs: 'react' },
    // 'react-dom': { root: 'react-dom', amd: 'react-dom', commonjs2: 'react-dom', commonjs: 'react-dom' }
  }
};
