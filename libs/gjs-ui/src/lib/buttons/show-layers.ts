import Button from "@grapesjs/panels/model/Button";
import { UiCommandNames } from "../commands";

export const ShowLayersButton: Button = {
	id:      "show-layers",
	active:  true,
	label:   `<i class="ti ti-box-multiple"></i>`,
	command: "ui.show-layers",
	// Once activated disable the possibility to turn it off
	togglable: false,
} as Button & { label: string, command: UiCommandNames };