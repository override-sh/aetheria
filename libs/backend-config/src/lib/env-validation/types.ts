import { ENV_VALIDATION_HOOK } from "./constants";
import { ZodError, ZodSchema } from "zod";

/**
 * @description This type contains the hook callbacks that are emitted by the EnvValidation class.
 */
export type EnvValidationEvents = {
	[ENV_VALIDATION_HOOK.before_validation]: { config: Record<string, any> }
	[ENV_VALIDATION_HOOK.after_validation]: { config: Record<string, any> }
	[ENV_VALIDATION_HOOK.validate_schema]: {
		schema: ZodSchema,
		config: Record<string, any>,
		error: ZodError | null,
	}
	[ENV_VALIDATION_HOOK.configuration_resolved_files]: { files: string[] }
	[ENV_VALIDATION_HOOK.configuration_loaded_schemas]: { schemas: ZodSchema[] }
}