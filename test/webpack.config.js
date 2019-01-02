const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require('./src/loaders/babel-loader-plugin-example.js')]
            }
          }
        ]
      },
      {
        test: /\.txt/,
        use: [
          {loader: path.resolve('./src/loaders/txt-loader.js')}
        ]
      }
    ]
  }
}