const path = require('path')
module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: ['./webpack-test/index.js', './webpack-test/index-copy.js'],
    output: {
        path: path.resolve(__dirname, 'webpack-test/dist'),
        filename: 'index.bundle.js'
    }
}