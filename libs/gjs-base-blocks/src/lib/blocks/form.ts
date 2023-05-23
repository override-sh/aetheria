import { Editor } from "@grapesjs/index";

export const FormBlock = (editor: Editor) => {
	editor.Blocks.add("form", {
		label:    "Form container",
		category: "Forms",
		content:  {
			type: "form",
		},
	});
};