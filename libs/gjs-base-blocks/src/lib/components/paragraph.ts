import { Editor } from "grapesjs";
import { explodeClasses } from "@open-press/utility";

export const ParagraphComponent = (editor: Editor) => {
	editor.Components.addType("paragraph", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => ["P"].includes(el.tagName),

		extend: "text",

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "p",
				classes:    explodeClasses("text-base p-2"),
				components: [
					{
						type:    "textnode",
						content: "This is a paragraph",
					},
				],
			},
		},
	});
};