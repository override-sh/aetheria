import { Editor } from "grapesjs";
import { explodeClasses } from "@open-press/utility";

export const FormComponent = (editor: Editor) => {
	editor.Components.addType("form", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => el.tagName === "FORM",

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "form",
				droppable:  true, // Can't drop other elements inside
				attributes: { // Default attributes
					target:       "none",
					method:       "get",
					autocomplete: "on",
				},
				traits:     [
					"action",
					{
						type:    "select",
						name:    "target",
						options: [
							{
								id:   "none",
								name: "None",

							},
							{
								id:   "_self",
								name: "Self",
							},
							{
								id:   "_blank",
								name: "Blank",
							},
							{
								id:   "_parent",
								name: "Parent",
							},
							{
								id:   "_top",
								name: "Top",
							},
						],
					},
					"rel",
					{
						type:    "select",
						name:    "method",
						options: [
							{
								id:   "get",
								name: "GET",
							},
							{
								id:   "post",
								name: "POST",
							},
						],
					},
					{
						type:       "checkbox",
						name:       "autocomplete",
						valueTrue:  "on",
						valueFalse: "off",
					},
					{
						type:  "checkbox",
						name:  "novalidate",
						label: "Disable validation",
					},
				],
				classes:    explodeClasses("p-2"),
			},
		},
	});
};