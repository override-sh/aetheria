import { Editor } from "@grapesjs/index";
import { makeBlockLabel } from "./label-factory";

export const FormBlock = (editor: Editor) => {
	editor.Blocks.add("form", {
		label:    makeBlockLabel("Form container", "code-plus"),
		category: "Forms",
		content:  {
			type: "form",
		},
		select:   true,
	});
};