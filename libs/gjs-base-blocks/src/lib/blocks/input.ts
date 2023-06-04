import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const InputBlock = (editor: Editor) => {
	editor.Blocks.add("input", {
		label:    makeBlockLabel("Input", "forms"),
		category: "Forms",
		content:  {
			type: "input",
		},
	});
};