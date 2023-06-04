import { Injectable } from "@nestjs/common";
import { Hookable } from "@override/utility/server";

@Injectable()
export class HookableService<
	FunctionTypeObject extends {
		[key: string | number | symbol]: (data: any) => void
	},
	HookName extends keyof FunctionTypeObject = keyof FunctionTypeObject,
>
	extends Hookable<FunctionTypeObject, HookName> {
	/**
	 * @description This function will trigger a named hook with the given arguments.
	 * @param {string} hook The hook to trigger.
	 * @param args The arguments to pass to the hook.
	 * @returns {Hookable} The hookable object.
	 */
	public override trigger(
		hook: HookName,
		args: object,
	): Hookable<FunctionTypeObject, HookName> {
		return super.trigger(hook, args);
	}

	/**
	 * @description This function will trigger a named hook with the given arguments.
	 * @param {string} hook The hook to trigger.
	 * @param args The arguments to pass to the hook.
	 * @returns {Hookable} The hookable object.
	 */
	public override emit(
		hook: HookName,
		args: object,
	): Hookable<FunctionTypeObject, HookName> {
		return super.emit(hook, args);
	}

	/**
	 * @description This function will trigger a named hook with the given arguments.
	 * @param {string} hook The hook to trigger.
	 * @param args The arguments to pass to the hook.
	 * @returns {Hookable} The hookable object.
	 */
	public override fire(
		hook: HookName,
		args: object,
	): Hookable<FunctionTypeObject, HookName> {
		return super.fire(hook, args);
	}
}
