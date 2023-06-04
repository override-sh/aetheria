import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const HeaderBlock = (editor: Editor) => {
	editor.Blocks.add("header", {
		label:    makeBlockLabel("Header", "heading"),
		category: "Basic",
		content:  {
			type: "header",
		},
	});
};