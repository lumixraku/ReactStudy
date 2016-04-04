module.exports = {
  entry: './browserHistory.js',
  output: {
    filename: 'build.js'
  },
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["es2015", "react", "stage-0"]
      }
    }]
  }
};
