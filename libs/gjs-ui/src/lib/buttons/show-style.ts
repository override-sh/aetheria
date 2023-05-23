import Button from "@grapesjs/panels/model/Button";
import { UiCommandNames } from "../commands";

export const ShowStyleButton: Button = {
	id:        "show-style",
	active:    true,
	label:     `<i class="ti ti-brush"></i>`,
	command:   "ui.show-styles",
	togglable: false,
} as Button & { label: string, command: UiCommandNames };