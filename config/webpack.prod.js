const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig('production'), {
	entry: {
		main: './src/main.aot.ts'
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
