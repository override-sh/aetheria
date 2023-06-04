import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const ButtonBlock = (editor: Editor) => {
	editor.Blocks.add("button", {
		label:    makeBlockLabel("Button", "square-plus"),
		category: "Forms",
		content:  {
			type: "button",
		},
	});
};