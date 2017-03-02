const webpack = require("webpack"),
	path = require('path');

console.log(__dirname);
module.exports = function (env) {
	return {
		entry: {
			vendor: './src/vendor.ts'
		},
		output: {
			path: path.join(process.cwd(), 'dist'),
			filename: "[name].bundle.js"
		},
		resolve: {
			extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
		},
		module: {
			loaders: [
				{test: /\.tsx?$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader']},
				{test: /\.(html|css)?$/, loader: 'raw-loader'}
			]
		}
	};
};