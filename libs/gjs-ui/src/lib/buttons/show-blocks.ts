import Button from "@grapesjs/panels/model/Button";
import { SHOW_BLOCKS, UiCommandNames } from "../commands";

export const ShowBlocksButton: Button = {
	id:      SHOW_BLOCKS,
	active:  true,
	label:   `<i class="ti ti-components"></i>`,
	command: SHOW_BLOCKS,
	// Once activated disable the possibility to turn it off
	togglable: false,
} as Button & { label: string, command: UiCommandNames };