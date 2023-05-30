export type UiCommandNames =
	"ui.show-layers"
	| "ui.show-styles"
	| "ui.show-traits"
	| "ui.show-blocks"
	| "ui.set-device-desktop"
	| "ui.set-device-mobile"
	| "ui.import-code";

export const SHOW_LAYERS: UiCommandNames = "ui.show-layers";
export const SHOW_STYLES: UiCommandNames = "ui.show-styles";
export const SHOW_TRAITS: UiCommandNames = "ui.show-traits";
export const SHOW_BLOCKS: UiCommandNames = "ui.show-blocks";
export const SET_DEVICE_DESKTOP: UiCommandNames = "ui.set-device-desktop";
export const SET_DEVICE_MOBILE: UiCommandNames = "ui.set-device-mobile";
export const IMPORT_CODE: UiCommandNames = "ui.import-code";

export const UI_COMMAND_NAMES: UiCommandNames[] = [
	SHOW_LAYERS,
	SHOW_STYLES,
	SHOW_TRAITS,
	SHOW_BLOCKS,
	SET_DEVICE_DESKTOP,
	SET_DEVICE_MOBILE,
	IMPORT_CODE,
];