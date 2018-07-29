/*
 * @Author: lhp
 * @Date:   2018-07-27 20:33:10
 * @Last Modified by:   lhp
 * @Last Modified time: 2018-07-29 13:48:24
 */
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const PruifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');



module.exports = {
	mode: 'production', //打包模式  production  或 development
	entry: __dirname + "/src/index.js", //入口文件

	output: {
		path: __dirname + "/build", //打包后的文件存放的地方
		filename: './bundle.js' //打包输出的文件名，即html引入的文件

	},
	devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
	//搭建web服务器
	devServer: {
		contentBase: path.join(__dirname, '/'), //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: false, //实时刷新
		port: 8080, //默认8080
		hot: false //热加载
	},
	optimization: { //提取公共部分
		splitChunks: {
			chunks: 'all'
		}
	},
	//添加插件
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/, //兼容react语法
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			}, {
				test: /\.css$/, //将css嵌入js文件中
				use: [
					MiniCssExtractPlugin.loader, {
						loader: "css-loader",
						options: { //将类名局域化
							Minimize: true, //代码压缩
							modules: true, // 指定启用 css modules
							localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
						}
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: [require("autoprefixer")("last 100 versions")]
						}
					}
				],
				exclude: /src/
			}, {
				test: /\.css$/,
				exclude: /(node_modules)/,
				loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'
			}, {
				test: /\.css$/,
				loader: "postcss-loader",
				exclude: /src/
			},
			// 小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
			// 大于8k的呢?则直接file-loader打包, 这里并没有写明file-loader.但是确实是需要安装,否则会有问题.而name也是file-loader的属性. 重复一次 必须安装file-loader
			{
				test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)\??.*$/,
				loader: 'url-loader',
				query: {
					// 图片大小限制 单位b
					limit: 8192,
					// 生成的文件的存放目录
					name: 'resourse/[name].[ext]'
				}
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.html", //new 一个这个插件的实例，并传入相关的参数
			hash: true, //为文件添加哈希值
			minify: true, //使用html压缩
			chunksSortMode: 'none'
		}),
		// new webpack.HotModuleReplacementPlugin(), //热加载插件
		new CleanWebpackPlugin('build/*.*', { //清除build文件中的残余文件
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new CopyWebpackPlugin([{
			"from": "./js",
			"to": "./js"
		}, {
			"from": "./data",
			"to": "./data"
		}, {
			"from": "./icon",
			"to": "./icon"
		}, {
			"from": "./iconfont",
			"to": "./iconfont"
		}, {
			"from": "./antd",
			"to": "./antd"
		}]),
		new MiniCssExtractPlugin({　　 //分离出css
			filename: "[name].[chunkhash:8].css",
			　　chunkFilename: "[id].css"　　
		}),
		new CSSSplitWebpackPlugin({ //切割css文件
			size: 4000,
			filename: 'css/[name]-[part].[ext]'
		}),
		new PruifyCSSPlugin({ //删除无用的css样式
			paths: glob.sync(path.join(__dirname, '*.html')) //下所有的html
		})
	]

};