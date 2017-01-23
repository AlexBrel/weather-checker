const webpack = require("webpack"),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig('development'), {
	entry: {
		main: './src/main.ts'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		})
	],
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
