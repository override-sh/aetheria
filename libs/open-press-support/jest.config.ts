/* eslint-disable */
export default {
	displayName:          "open-press-support",
	preset:               "../../jest.preset.js",
	testEnvironment:      "node",
	transform:            {
		"^.+\\.[tj]s$": [
			"ts-jest",
			{ tsconfig: "<rootDir>/tsconfig.spec.json" },
		],
	},
	moduleFileExtensions: [
		"ts",
		"js",
		"html",
	],
	coverageDirectory:    "../../coverage/libs/open-press-support",
};
