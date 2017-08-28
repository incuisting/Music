const path = require('path');

module.exports = {
  entry: {
    index:'./src/js/index.js',
    songs:'./src/js/songs.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
      rules:[
          {
              test:/\.css$/,
              use:[
                  'style-loader',
                  'css-loader'
              ]
          }
      ]
  }
};