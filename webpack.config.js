const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, args) => {
	return {
		context: path.resolve(__dirname, 'src'),
		entry: () => path.resolve(__dirname, 'src/index.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
			publicPath: '/'
		},
		module: {
			rules: [{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: [path.resolve(__dirname, 'node_modules')],
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}]
			}, {
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}]
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}]
		},
		resolve: {
			modules: ['node_modules', path.resolve(__dirname, 'src')],
			extensions: ['.js', '.css'],
			alias: {
				jquery: 'jquery/dist/jquery.js',
				AUI: path.resolve(__dirname, 'src/lib/aui')
			}
		},
		devtool: "eval-source-map",
		devServer: {
			compress: true,
			historyApiFallback: true,
			hot: true,
			https: false,
			noInfo: true
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery"
			}),
			new HtmlWebpackPlugin({
				hot: true,
				lazy: true,
				inject: 'body',
				hash: true,
				template: path.resolve(__dirname, "src/index.html")
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.AggressiveMergingPlugin()
		]

	}
}