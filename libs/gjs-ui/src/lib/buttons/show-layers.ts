import Button from "@grapesjs/panels/model/Button";
import { SHOW_LAYERS, UiCommandNames } from "../commands";

export const ShowLayersButton: Button = {
	id:      SHOW_LAYERS,
	active:  false,
	label:   `<i class="ti ti-box-multiple"></i>`,
	command: SHOW_LAYERS,
	// Once activated disable the possibility to turn it off
	togglable: false,
} as Button & { label: string, command: UiCommandNames };