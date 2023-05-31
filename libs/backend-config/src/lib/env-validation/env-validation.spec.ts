import {
	EnvValidation,
} from "./env-validation";
import { makeEnvHook } from "./hook-factory";
import { ENV_VALIDATION_HOOK } from "./constants";

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
	});

	it("fails if cannot validate environment", () => {
		EnvValidation.instance.addConfigFileFilter(/\.config\.(ts|js)$/);
		expect(() => EnvValidation.instance.validateEnv({ test: false }))
			.toThrowError(/Config validation error: .*/);
	});

	it("passes if environment is valid", () => {
		EnvValidation.instance.clearConfigFileFilters();
		expect(EnvValidation.instance.validateEnv({ test: false }))
			.toEqual({ test: false });
	});

	it("emits hooks", () => {
		EnvValidation.instance
		             .clearConfigFileFilters()
		             .listen(
			             makeEnvHook(
				             ENV_VALIDATION_HOOK.validate_before,
				             ({ config }) => {
					             expect(config)
						             .toEqual({ test: false });
				             },
			             ),
		             )
		             .on(
			             makeEnvHook(
				             ENV_VALIDATION_HOOK.validate_after,
				             ({ config }) => {
					             expect(config)
						             .toEqual({ test: false });
				             },
			             ),
		             )
		             .listen(
			             makeEnvHook(
				             ENV_VALIDATION_HOOK.validate_schema,
				             ({
					              config,
					              error,
				              }) => {
					             expect(config)
						             .toEqual({ test: false });
					             expect(error)
						             .toBeUndefined();
				             },
			             ),
		             )
		             .listen(
			             makeEnvHook(
				             ENV_VALIDATION_HOOK.configuration_resolved_files,
				             ({ files }) => {
					             expect(files)
						             .toHaveLength(0);
				             },
			             ),
		             )
		             .listen(
			             makeEnvHook(
				             ENV_VALIDATION_HOOK.configuration_loaded_schemas,
				             ({ schemas }) => {
					             expect(schemas)
						             .toHaveLength(0);
				             },
			             ),
		             );

		expect(EnvValidation.instance.validateEnv({ test: false }))
			.toEqual({ test: false });
	});
});