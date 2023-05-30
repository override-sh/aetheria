import Button from "@grapesjs/panels/model/Button";

export const FullscreenButton: Button = {
	id:      "fullscreen",
	active:  false,
	label:   `<i class="ti ti-maximize"></i>`,
	command: "core:fullscreen",
} as Button & { label: string };