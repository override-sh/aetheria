import { Panel } from "grapesjs";
import { ShowLayersButton, ShowStyleButton, ShowTraitsButton } from "../buttons";
import { ShowBlocksButton } from "../buttons/show-blocks";

export const PanelSwitcherPanel: Panel = {
	id: "panel-switcher",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	el: ".panel__switcher",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	buttons: [
		ShowLayersButton,
		ShowStyleButton,
		ShowTraitsButton,
		ShowBlocksButton,
	],
};