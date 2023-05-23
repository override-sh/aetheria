import Panel from "@grapesjs/panels/model/Panel";
import { ViewComponentsButton } from "../buttons";
import { ExportCodeButton } from "../buttons";

export const BasicActions: Panel = {
	id: "basic-actions",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	el: ".panel__basic-actions",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	buttons: [
		ViewComponentsButton,
		ExportCodeButton,
	],
};