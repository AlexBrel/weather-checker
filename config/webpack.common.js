const webpack = require('webpack');

module.exports = {
	entry: './app/js/app.ts',
	output: {
		path: "./app/dist",
		filename: "bundle.js"
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, loader: 'ts-loader'}
		]
	}
};
