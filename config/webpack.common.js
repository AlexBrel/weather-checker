const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.ts',
        vendor: './src/vendor.ts'
    },
    output: {
        path: "./dist",
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
            {test: /\.(html|css)?$/, loader: 'raw-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            filename: '[name].bundle.js',
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{from: './src/assets', to: 'assets'}])
    ]
};
