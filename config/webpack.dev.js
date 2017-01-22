const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	entry: {
		main: './src/main.ts'
	},
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
