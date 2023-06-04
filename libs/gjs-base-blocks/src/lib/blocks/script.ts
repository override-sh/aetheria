import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const ScriptBlock = (editor: Editor) => {
	editor.Blocks.add("script", {
		label:    makeBlockLabel("Script", "code-plus"),
		category: "Basic",
		content:  {
			type: "script-custom",
		},
	});
};