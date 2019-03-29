/*
 * @Author: lhp
 * @Date:   2018-07-27 20:33:10
 * @Last Modified by:   lhp
 * @Last Modified time: 2018-08-11 12:17:54
 */
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const PruifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const pkg = require('./package.json');
// console.log(path.join(__dirname, '/'))

module.exports = {
	mode: 'development', //打包模式  production  或 development
	entry: __dirname + "/src/index.js", //入口文件

	output: {
		path: __dirname + "/build", //打包后的文件存放的地方
		filename: './bundle.js' //打包输出的文件名，即html引入的文件

	},
	devtool: 'eval-source-map',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			//   Templates: path.resolve(__dirname, 'src')
		}
	},
	//搭建web服务器
	devServer: {
		contentBase: path.join(__dirname, '/'), //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新
		port: 8081, //默认8080
		host: '0.0.0.0', //访问地址
		hot: true, //热加载
		// proxy: {
		// 	'^http://192.168.1.88:8088/uac': {
		// 		target: 'http://192.168.1.8:8088/uac/',
		// 		changeOrigin: true,
		// 		secure: false

		// 	},
		// 	// '/uac/auth/form': {
		// 	// 	target: 'http://192.168.1.8:8088',
		// 	// 	changeOrigin: true,
		// 	// 	secure: false

		// 	// }
		// }
	},

	//添加插件
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/, //兼容react语法
			use: {
				loader: "babel-loader"
			},
			exclude: /node_modules/
		},

		{
			test: /\.css$/,
			exclude: /(node_modules)/,
			loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'
		},
		{
			test: /\.less$/,
			use: [
				{ loader: 'style-loader' },
				{ loader: 'css-loader' },
				{
					loader: "postcss-loader",
					options: {

						plugins: [
							require('autoprefixer')({
								browsers: ['last 5 version']
							})
						]
					}
				},
			
				{
					loader: 'less-loader', options: {
						modifyVars: pkg.theme,
						javascriptEnabled: true  // 在less里面可以使用JavaScript表达式
					}
				},
			],
			// 切记这个地方一定要引入antd，文档上没有写入但是一定要因引进去，切记切记
			include: [/antd/],
		},
		{
			test: /\.less$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
						sourceMap: true,
						localIdentName: '[name]__[local]_[hash:base64:5]',
					},
				},
				{
					loader: "postcss-loader",
					options: {
						plugins: [
							require('autoprefixer')({
								browsers: ['last 5 version']
							})
						]
					}
				},
				{ loader: 'less-loader', options: { javascriptEnabled: true } },
			],
			exclude: [/antd/],
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
			// , {
			// 	test: /\.js$/,
			// 	loader: 'eslint-loader',
			// 	enforce: "pre",
			// 	include: [path.resolve(__dirname, 'src')], // 指定检查的目录
			// 	options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
			// 		formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
			// 	}
			// }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.html", //new 一个这个插件的实例，并传入相关的参数
			hash: true, //为文件添加哈希值
			minify: true, //使用html压缩
			chunksSortMode: 'none'
		}),
		new webpack.HotModuleReplacementPlugin(), //热加载插件
		new CopyWebpackPlugin([
			{
				"from": "./src/config.test.js",
				"to": "./config.js"
			}]),
		// new MiniCssExtractPlugin({　　 //分离出css
		// 	filename: "[name].[chunkhash:8].css",
		// 	chunkFilename: "[id].css"
		// }),
		// new CSSSplitWebpackPlugin({ //切割css文件
		// 	size: 4000,
		// 	filename: 'css/[name]-[part].[ext]'
		// }),
		new PruifyCSSPlugin({ //删除无用的css样式
			paths: glob.sync(path.join(__dirname, '*.html')) //下所有的html
		}),
		new webpack.DefinePlugin({//定义环境变量
			__DEV__: JSON.stringify(true),
			__ALLURL__: JSON.stringify({
				'uac': 'http://192.168.1.8:8082',
				'indicators': 'http://192.168.31.152:8098'

			}),

		})
	],

};
// console.log(process.env.DEBUG)