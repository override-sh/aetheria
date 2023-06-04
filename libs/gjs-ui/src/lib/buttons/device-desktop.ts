import { Button } from "grapesjs";
import { UiCommandNames } from "../commands";

export const DeviceDesktopButton: Button = {
	id:        "device-desktop",
	label:     `<i class="ti ti-device-desktop"></i>`,
	command:   "ui.set-device-desktop",
	active:    true,
	togglable: false,
} as Button & { label: string, command: UiCommandNames };