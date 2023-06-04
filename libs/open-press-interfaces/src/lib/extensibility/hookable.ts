import { HookConfiguration } from "./hook-configuration";

export interface IHookable<
	FunctionTypeObject extends {
		[key: string | number | symbol]: (data: any) => void
	},
	HookName extends keyof FunctionTypeObject = keyof FunctionTypeObject,
> {
	/**
	 * @description This function will add a hook to the hookable object.
	 * @param {string} hook The hook to add.
	 * @param {Function} callback The callback to add.
	 * @returns {Hookable} The hookable object.
	 * @public
	 */
	on(
		{
			hook,
			callback,
		}: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): IHookable<FunctionTypeObject, HookName>;

	/**
	 * @description This function will add a hook to the hookable object.
	 * @param configuration The configuration for the hook.
	 * @returns {Hookable} The hookable object.
	 */
	listen(
		configuration: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): IHookable<FunctionTypeObject, HookName>;

	/**
	 * @description This function will return all listeners for the given hook.
	 * @param {string} hook The hook to get the listeners for.
	 * @returns {Function[]} The listeners for the given hook.
	 */
	listeners(hook: HookName): (FunctionTypeObject[HookName])[];

	/**
	 * @description This function will add a hook to the hookable object that will only be called once.
	 * @param {string} hook The hook to add.
	 * @param {Function} callback The callback to add.
	 * @returns {Hookable} The hookable object.
	 */
	once(
		{
			hook,
			callback,
		}: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): IHookable<FunctionTypeObject, HookName>;

	/**
	 * @description This function will remove a hook from the hookable object.
	 * @param {string} hook The hook to remove.
	 * @param {Function} callback The callback to remove.
	 * @returns {Hookable} The hookable object.
	 */
	off(
		{
			hook,
			callback,
		}: HookConfiguration<HookName, FunctionTypeObject[HookName]>,
	): IHookable<FunctionTypeObject, HookName>;
}