import Button from "@grapesjs/panels/model/Button";
import { UiCommandNames } from "../commands";

export const DeviceMobileButton: Button = {
	id:        "device-modile",
	label:     `<i class="ti ti-device-mobile"></i>`,
	command:   "ui.set-device-mobile",
	active:    false,
	togglable: false,
} as Button & { label: string, command: UiCommandNames };