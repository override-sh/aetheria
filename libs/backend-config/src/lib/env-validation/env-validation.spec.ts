import { EnvValidation } from "./env-validation";
import { resolve } from "path";

describe("env-validation", () => {
	it("regex matches only config files", () => {
		expect(EnvValidation.instance.configFileFilters[0].test("test.config.ts"))
			.toBeTruthy();
		expect(EnvValidation.instance.configFileFilters[0].test("test.config.spec.ts"))
			.toBeFalsy();
	});

	it("can add config filters", () => {
		expect(EnvValidation.instance.addConfigFileFilter(/\.config\.(ts|js)$/).configFileFilters)
			.toHaveLength(2);
	});

	it("can remove config filters", () => {
		expect(EnvValidation.instance.addConfigFileFilter(/.*/)
		                    .removeConfigFileFilter(/\.config\.(ts|js)$/).configFileFilters)
			.toHaveLength(1);
	});

	it("can clear config filters", () => {
		expect(EnvValidation.instance.clearConfigFileFilters().configFileFilters)
			.toHaveLength(0);

		// reset the filters
		EnvValidation.instance.addConfigFileFilter(/\.config\.(ts|js)$/);
	});

	it("can add resolution paths", () => {
		expect(EnvValidation.instance.addResolutionPath(__dirname).resolutionPaths)
			.toHaveLength(3);
	});

	it("can remove resolution paths", () => {
		expect(EnvValidation.instance.addResolutionPath("test")
		                    .removeResolutionPath(__dirname).resolutionPaths)
			.toHaveLength(2);
	});

	it("can clear resolution paths", () => {
		expect(EnvValidation.instance.clearResolutionPaths().resolutionPaths)
			.toHaveLength(0);

		// reset the paths
		EnvValidation.instance.addResolutionPath(__dirname);
		EnvValidation.instance.addResolutionPath(resolve(__dirname, ".."));
	});

	it("fails if cannot validate environment", () => {
		expect(() => EnvValidation.instance.validateEnv({ test: false }))
			.toThrowError(/Config validation error: .*/);
	});

	it("passes if environment is valid", () => {
		EnvValidation.instance.clearConfigFileFilters();
		expect(EnvValidation.instance.validateEnv({ test: false }))
			.toEqual({ test: false });
	});

	it("emits hooks", () => {
		const unsubscribe = EnvValidation.instance
		                                 .clearConfigFileFilters()
		                                 .onBeforeValidation
		                                 .subscribe(
			                                 (
				                                 sender,
				                                 { config },
			                                 ) => {
				                                 expect(config)
					                                 .toEqual({ test: false });
			                                 },
		                                 );

		expect(EnvValidation.instance.validateEnv({ test: false }))
			.toEqual({ test: false });

		unsubscribe();
	});
});