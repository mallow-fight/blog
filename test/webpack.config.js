module.exports = {
  mode: 'production',
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
          'babel-loader'
        ]
      }
    ]
  }
}