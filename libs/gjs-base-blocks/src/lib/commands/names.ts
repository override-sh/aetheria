export type BaseBlocksCommandNames =
	"base-block.open-script-editor-modal"
	| "base-block.open-stylesheet-editor-modal";

export const OPEN_SCRIPT_EDITOR_MODAL: BaseBlocksCommandNames = "base-block.open-script-editor-modal";
export const OPEN_STYLESHEET_EDITOR_MODAL: BaseBlocksCommandNames = "base-block.open-stylesheet-editor-modal";

export const UI_COMMAND_NAMES: BaseBlocksCommandNames[] = [
	OPEN_SCRIPT_EDITOR_MODAL,
	OPEN_STYLESHEET_EDITOR_MODAL,
];