module.exports = {
  entry: './app3.js',
  output: {
    filename: 'build.js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};