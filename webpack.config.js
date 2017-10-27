const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let isProd = process.env.NODE_ENV === 'production';

let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader', 'sass-loader']
});
let cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		// publicPath: "/src/templates/",
		filename: '[name].bundle.js'
	},
	node: {
		__filename: true,
		__dirname: true,
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: cssConfig
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: ['html-loader', 'pug-html-loader']
			},
			{
				test: /\.(njk|nunjucks)$/,
				loader: 'nunjucks-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				//use: 'file-loader?name=[hash:6].[ext]&outputPath=images/',
				use: [
					// 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
					// 'file-loader?name=[name].[ext]&outputPath=images/',
					'file-loader?name=images/[name].[ext]',
					'image-webpack-loader'
				]
			}
		]
	},
	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		compress: true,
		port: 8000,
		stats: 'errors-only',
		// open: true
	},
	externals: {},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'comments',
			// minify: {
			// 	collapseWhitespace: true
			// },
			hash: true,
			// filename: './../index.html',
			template: './src/index.html'
		}),
		new ExtractTextPlugin({
			filename: "app.css",
			disable: !isProd,
			allChunks: true
		})
	]
};