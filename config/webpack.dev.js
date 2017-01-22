const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	DefinePlugin = require('webpack/lib/DefinePlugin'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	plugins: [
		new DefinePlugin({
			'process.env.ENV': JSON.stringify('development')
		})
	],
	devtool: "#source-map",
	debug: true,
	stats: {
		colors: true,
		modules: true,
		reasons: true,
		errorDetails: true
	},
	devServer: {
		contentBase: './dist',
		info: true,
		hot: false,
		inline: true
	}
});
