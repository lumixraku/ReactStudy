module.exports = {
  entry: './main.jsx',  //不能直接写main.jsx  //当前目录下必须加上 ./  //否则提示找不到文件
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }
};