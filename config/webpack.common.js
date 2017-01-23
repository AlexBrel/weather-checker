const webpack = require('webpack'),
	path = require('path'),
	DefinePlugin = require('webpack/lib/DefinePlugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (ENV) {
	return {
		entry: {
			vendor: './src/vendor.ts'
		},
		output: {
			path: path.join(process.cwd(), 'dist'),
			filename: "[name].bundle.js"
		},
		resolve: {
			extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
		},
		module: {
			loaders: [
				{test: /\.tsx?$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
				{test: /\.(html|css)?$/, loader: 'raw-loader'}
			]
		},
		plugins: [
			new DefinePlugin({
				'process.env.ENV': JSON.stringify(ENV)
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names: ['common'],
				filename: '[name].bundle.js',
				minChunks: 2
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './src/index.html'
			}),
			new CopyWebpackPlugin([{from: './src/assets', to: 'assets'}])
		]
	}
};
