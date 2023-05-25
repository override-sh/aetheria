import Button from "@grapesjs/panels/model/Button";
import { SHOW_TRAITS, UiCommandNames } from "../commands";

export const ShowTraitsButton: Button = {
	id:        SHOW_TRAITS,
	active:    false,
	label:     `<i class="ti ti-settings-2"></i>`,
	command:   SHOW_TRAITS,
	togglable: false,
} as Button & { label: string, command: UiCommandNames };