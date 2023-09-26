module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true,
		"jest/globals": true
	},
	"extends": "eslint:recommended",
	"plugins": ["jest"],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
	}
};
