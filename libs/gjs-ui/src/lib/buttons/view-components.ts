import Button from "@grapesjs/panels/model/Button";

export const ViewComponentsButton: Button = {
	id:        "visibility",
	active:    true,
	className: "btn-toggle-borders",
	label:     `<i class="ti ti-border-none"></i>`,
	command:   "sw-visibility",
} as Button & { label: string };