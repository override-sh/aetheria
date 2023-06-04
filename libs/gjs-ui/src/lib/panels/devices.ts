import { Panel } from "grapesjs";
import { DeviceDesktopButton, DeviceMobileButton } from "../buttons";

export const DevicesPanel: Panel = {
	id: "panel-devices",
	el: ".panel__devices",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	buttons: [
		DeviceDesktopButton,
		DeviceMobileButton,
	],
};