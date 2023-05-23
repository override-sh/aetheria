import { Editor } from "@grapesjs/index";

export const InputBlock = (editor: Editor) => {
	editor.Blocks.add("input", {
		label:    "Input",
		category: "Forms",
		content:  {
			type: "input",
		},
	});
};