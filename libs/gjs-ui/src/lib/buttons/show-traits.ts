import Button from "@grapesjs/panels/model/Button";
import { UiCommandNames } from "../commands";

export const ShowTraitsButton: Button = {
	id:        "show-traits",
	active:    true,
	label:     `<i class="ti ti-settings-2"></i>`,
	command:   "ui.show-traits",
	togglable: false,
} as Button & { label: string, command: UiCommandNames };