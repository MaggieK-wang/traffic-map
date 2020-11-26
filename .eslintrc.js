module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential", "@vue/standard"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"space-before-function-paren": ["error", "never"],
		semi: ["error", "always"],
		"comma-dangle": ["off", "always"],
	},
	globals: {
		BMapGL: true,
		mapvgl: true,
		mapv: true,
		BMap: true,
		BMapLib: true,
		BMAP_STATUS_SUCCESS: true,
		BMapGLLib: true,
		BMAP_DRIVING_POLICY_AVOID_HIGHWAYS: true,
		BMAP_DRIVING_POLICY_FIRST_HIGHWAYS: true,
	},
	parserOptions: {
		parser: "babel-eslint",
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)"],
			env: {
				jest: true,
			},
		},
	],
};
