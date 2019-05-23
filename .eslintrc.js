module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['plugin:jest/recommended', 'airbnb-base', 'prettier'],
	rules: {
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
	},
	plugins: ['jest', 'prettier'],
};
