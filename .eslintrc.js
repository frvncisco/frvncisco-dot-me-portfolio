module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@next/next/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			tsx: true,
		},
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		// 'eol-last': 'off',
		// 'react/jsx-uses-react': 'off',
		// indent: ['error', 2],
		// 'linebreak-style': ['error', 'unix'],
		// quotes: ['error', 'single'],
		// semi: ['error', 'never'],
	},
}
