import { Editor } from "@grapesjs/index";

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

				},
				traits:     [
					"action",
					{
						type:    "select",
						name:    "target",
						options: [
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
					"target",
					"rel",
					{
						type:    "select",
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
						name:    "method",
					},
					{
						type: "checkbox",
						name: "autocomplete",
					},
					{
						type: "checkbox",
						name: "novalidate",
					},
				],
				classes:    "p-2 border-2 border-dashed".split(" "),
			},
		},
	});
};