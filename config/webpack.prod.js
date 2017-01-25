const webpack = require("webpack"),
	path = require('path'),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

module.exports = function (env) {
	return webpackMerge(commonConfig(env), {
		entry: {
			main: './src/main.aot.ts'
		},
		resolve: {
			alias: {
				logger: path.resolve(__dirname, '../src/app/core/logger/prod-logger.service.ts')
			}
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				comments: false,
				compress: {
					sequences: true,
					booleans: true,
					loops: true,
					unused: true,
					warnings: false,
					unsafe: true
				}
			})
		]
	});
};
