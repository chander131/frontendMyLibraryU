const aliasPath = require('./aliasPath');

module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'plugin:react/recommended',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'no-plusplus': 'off',
		'linebreak-style': 0,
		'max-len': ['error', 120],
		'jsx-a11y/alt-text': 'off',
		'indent': ['error', 'tab'],
		'no-restricted-syntax': 'off',
		'react/jsx-indent': ['error', 'tab'],
		'import/prefer-default-export': 'off',
		'jsx-quotes': ['error', 'prefer-single'],
		'react/jsx-indent-props': ['error', 'tab'],
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'no-tabs': ['error', { 'allowIndentationTabs': true }],
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
	},
	'settings': {
		'import/resolver': {
			'babel-module': {
				'module-resolver': {
					'alias': aliasPath,
				}
			}
		}
	}
};
