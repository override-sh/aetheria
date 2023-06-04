import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const StylesheetBlock = (editor: Editor) => {
	editor.Blocks.add("stylesheet", {
		label:    makeBlockLabel("Stylesheet", "code-dots"),
		category: "Basic",
		content:  {
			type: "style-custom",
		},
	});
};