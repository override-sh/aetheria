import Button from "@grapesjs/panels/model/Button";

export const ExportCodeButton: Button = {
	id:        "export",
	className: "btn-open-export",
	label:     `<i class="ti ti-code"></i>`,
	command:   "export-template",
	context:   "export-template",
} as Button & { label: string, context: string };