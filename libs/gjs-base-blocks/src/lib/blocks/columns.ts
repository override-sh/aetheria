import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const ColumnsBlock = (editor: Editor) => {
	editor.Blocks.add("columns", {
		label:    makeBlockLabel("Columns", "columns-2"),
		category: "Basic",
		content:  {
			type: "columns",
		},
	});
};