/*
 * @Author: lhp
 * @Date:   2018-08-11 12:19:25
 * @Last Modified by:   lhp
 * @Last Modified time: 2018-08-11 12:34:58
 */
module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	parser: 'babel-eslint',
	env: {
		browser: true,
	},
	// extends: 'eslint:google',  
	rules: {
		"quotes": ["off", "double"],// 强制使用单引号
		"semi": ["off", "always"],
		"no-console": ["off"],
		"arrow-parens": 0,
		'indent': ['off', 0, { 'SwitchCase': 1 }], // 空格2个
		"no-use-before-define": 2,//未定义前不能使用
		"no-class-assign": 2,//禁止给类赋值
		"no-constant-condition": 2,//禁止在条件中使用常量表达式
		"no-const-assign": 2,//禁止修改const声明的变量
		"no-invalid-regexp": 2,//禁止无效的正则表达式
		"no-this-before-super": 1,//在调用super()之前不能使用this或super
		"no-undef": 1,//不能有未定义的变量
		"no-unreachable": 0,//不能有无法执行的代码
	}
}