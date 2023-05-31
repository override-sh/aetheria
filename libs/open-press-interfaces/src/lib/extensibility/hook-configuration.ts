export interface HookConfiguration<HookName = string, HookCallback = (...args: any[]) => void> {
	hook: HookName;
	callback: HookCallback;
}