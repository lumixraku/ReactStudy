const path = require('path');
const webpack = require('webpack');

const getModulePath = function(name) {
  return path.join(__dirname, 'node_modules', name);
};
module.exports = [{
  entry: {
    'device': './comps/main.js'
  },
  output: {
    path: path.join(__dirname, 'build', 'js'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  // devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ["es2015", "react", "stage-0"]
      }
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
}];
