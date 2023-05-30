import { Editor } from "@grapesjs/index";
import { makeBlockLabel } from "./label-factory";
import { explodeClasses } from "@override/utility";

export const LabelBlock = (editor: Editor) => {
	editor.Blocks.add("label", {
		label:    makeBlockLabel("Label", "writing"),
		category: "Forms",
		content:  {
			type:    "label",
			content: "This is a label",
			classes: explodeClasses("text-sm font-semibold"),
		},
	});
};