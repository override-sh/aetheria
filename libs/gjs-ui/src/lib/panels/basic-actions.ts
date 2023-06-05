import { Panel } from "grapesjs";
import {
	ExportCodeButton,
	FullscreenButton,
	ImportCodeButton,
	PreviewButton,
	RedoButton,
	UndoButton,
	ViewComponentsButton,
} from "../buttons";

export const BasicActions: Panel = {
	id: "basic-actions",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	el: ".panel__basic-actions",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	buttons: [
		ViewComponentsButton,
		FullscreenButton,
		PreviewButton,
		UndoButton,
		RedoButton,
		ImportCodeButton,
		ExportCodeButton,
	],
};