import { Editor } from "@grapesjs/index";

export const InputComponent = (editor: Editor) => {
	editor.Components.addType("input", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => el.tagName === "INPUT",

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "input",
				draggable:  "form, form *", // Can be dropped only inside `form` elements
				droppable:  false, // Can't drop other elements inside
				attributes: { // Default attributes
					type:        "text",
					name:        "default-name",
					placeholder: "Insert text here",
				},
				traits:     [
					"name",
					"placeholder",
					{
						type: "checkbox",
						name: "required",
					},
				],
			},
		},
	});
};