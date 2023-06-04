import { Editor } from "grapesjs";
import { explodeClasses } from "@override/utility";

export const ContainerComponent = (editor: Editor) => {
	editor.Components.addType("container", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => ["DIV"].includes(el.tagName) && el.classList.contains("container-component"),

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:   "div",
				classes:   explodeClasses("container-component text-base p-4 relative w-full"),
				droppable: true,
			},
		},
	});
};