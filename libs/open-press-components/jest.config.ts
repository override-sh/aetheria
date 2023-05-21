/* eslint-disable */
export default {
	displayName: "open-press-components",
	preset: "../../jest.preset.js",
	transform: {
		"^.+\\.[tj]sx?$": [
			"@swc/jest",
			{ jsc: { transform: { react: { runtime: "automatic" } } } },
		],
	},
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
	],
	coverageDirectory: "../../coverage/libs/open-press-components",
};
