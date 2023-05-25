import Button from "@grapesjs/panels/model/Button";
import { SHOW_STYLES, UiCommandNames } from "../commands";

export const ShowStyleButton: Button = {
	id:        SHOW_STYLES,
	active:    false,
	label:     `<i class="ti ti-brush"></i>`,
	command:   SHOW_STYLES,
	togglable: false,
} as Button & { label: string, command: UiCommandNames };