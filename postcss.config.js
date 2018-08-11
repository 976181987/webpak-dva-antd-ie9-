/*
 * @Author: lhp
 * @Date:   2018-07-28 23:14:41
 * @Last Modified by:   lhp
 * @Last Modified time: 2018-07-29 15:27:53
 */

module.exports = ({
	file,
	options,
	env
}) => ({
	parser: file.extname === '.sss' ? 'sugarss' : false,
	plugins: {
		'postcss-import': {
			root: file.dirname
		},
		'postcss-cssnext': options.cssnext ? options.cssnext : false,
		'autoprefixer': env == 'production' ? options.autoprefixer : false,
		'cssnano': env === 'production' ? options.cssnano : false
	}
})
// module.exports = {
// 	plugins: [
// 		require('postcss-import'),
// 		require('autoprefixer')({
// 			browsers: ['last 10 versions', 'Firefox >= 20', 'Android >= 4.0', 'iOS >= 8']
// 		})
// 	]
// }