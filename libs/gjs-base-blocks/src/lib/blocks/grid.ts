import { Editor } from "@grapesjs/index";
import { makeBlockLabel } from "./label-factory";

export const GridBlock = (editor: Editor) => {
	editor.Blocks.add("grid", {
		label:    makeBlockLabel("Grid", "grid-dots"),
		category: "Basic",
		content:  {
			type: "grid",
		},
	});
};