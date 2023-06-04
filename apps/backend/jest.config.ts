/* eslint-disable */
export default {
	displayName:          "backend",
	preset:               "../../jest.preset.js",
	testEnvironment:      "node",
	testRegex:            ".*\\.(spec|e2e-spec)\\.ts$",
	testMatch:            undefined,
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
	coverageDirectory:    "../../coverage/apps/backend",
};
