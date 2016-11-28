const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['common'],
			filename: '[name].bundle.js',
			minChunks: 2
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			comments: false
		})
	]
});
