const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	devtool: "#source-map"
});
