const webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './app/js/main.ts',
		vendor: './app/vendor.ts'
	},
	output: {
		path: "./app/dist",
		filename: "[name].bundle.js"
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, loader: 'ts-loader'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap')}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['common'],
			filename: '[name].bundle.js',
			minChunks: 2
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './app/index.html'
		})
	]
};
