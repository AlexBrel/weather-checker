const webpack = require("webpack"),
	path = require('path'),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

console.log(__dirname);
module.exports = function (env) {
	return webpackMerge(commonConfig(env), {
		entry: {
			main: './src/main.ts'
		},
		plugins: [
			new webpack.LoaderOptionsPlugin({
				debug: true
			})
		],
		resolve: {
			alias: {
				logger: path.resolve(__dirname, '../src/app/core/logger/dev-logger.service.ts')
			}
		},
		devtool: "#source-map",
		stats: {
			colors: true,
			modules: true,
			reasons: true,
			errorDetails: true
		},
		devServer: {
			contentBase: './dist',
			hot: false,
			inline: true
		}
	});
};