import * as Joi from "joi";
import { ENV_VALIDATION_HOOK } from "./constants";

///////////////
// Callbacks //
///////////////

type EnvHookValidateBeforeCallback = (data: { config: Record<string, any> }) => void;
type EnvHookValidateAfterCallback = (data: { config: Record<string, any> }) => void;
type EnvHookValidateSchemaCallback = (
	data: {
		schema: Joi.ObjectSchema,
		config: Record<string, any>,
		error?: Joi.ValidationError,
	},
) => void;
type EnvHookConfigurationResolvedFilesCallback = (data: { files: string[] }) => void;
type EnvHookConfigurationLoadedSchemasCallback = (data: { schemas: Joi.ObjectSchema[] }) => void;

/////////////
// Exports //
/////////////

/**
 * @description This type contains the hook callbacks that are emitted by the EnvValidation class.
 */
export type EnvValidationHooksCallback = {
	[ENV_VALIDATION_HOOK.validate_before]: EnvHookValidateBeforeCallback
	[ENV_VALIDATION_HOOK.validate_after]: EnvHookValidateAfterCallback
	[ENV_VALIDATION_HOOK.validate_schema]: EnvHookValidateSchemaCallback
	[ENV_VALIDATION_HOOK.configuration_resolved_files]: EnvHookConfigurationResolvedFilesCallback
	[ENV_VALIDATION_HOOK.configuration_loaded_schemas]: EnvHookConfigurationLoadedSchemasCallback
}