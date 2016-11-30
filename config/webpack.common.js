const webpack = require('webpack'),
	ManifestRevisionPlugin = require('manifest-revision-webpack-plugin'),
    TextPlugin   = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin   = require('html-webpack-plugin'),
    rootAssetPath = './app/assets';

module.exports = {
	entry: {
        main: './app/js/main.ts',
		vendor: './app/vendor.ts'
	},
	output: {
		path: "./app/dist",
		filename: "[name].bundle.js"
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, loader: 'ts-loader'},
            { test: /\.css?$/, loaders: ['file?context=' + rootAssetPath + '&name=assets/css/[name].[ext]'] }
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['common'],
			filename: '[name].bundle.js',
			minChunks: 2
		}),
        new ManifestRevisionPlugin(__dirname + '/manifest.json',{
            rootAssetPath: rootAssetPath,
            ignorePaths: []
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.html'
        })
	]
};
