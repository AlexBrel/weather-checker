const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	DefinePlugin = require('webpack/lib/DefinePlugin'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new DefinePlugin({
			'process.env.ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			comments: false
		})
	]
});
