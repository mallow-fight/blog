const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: 11111,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript'
						],
					}
				},
				exclude: /node_modules|dist/,
			},
			{
				test: /\.less/,
				use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
				exclude: /node_modules|dist/,
			}
		]
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.less']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
}