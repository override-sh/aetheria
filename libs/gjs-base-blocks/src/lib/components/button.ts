import { Editor } from "grapesjs";
import { TRAIT_SECTION_HEADER } from "@open-press/gjs-ui";
import { explodeClasses } from "@open-press/utility";

type ButtonTypes =
	"button"
	| "reset"
	| "submit";
const button_types: ButtonTypes[] = [
	"button",
	"reset",
	"submit",
];


export const ButtonComponent = (editor: Editor) => {
	editor.Components.addType("button", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => el.tagName === "BUTTON",

		extend: "text",

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "button",
				droppable:  false, // Can't drop other elements inside
				attributes: { // Default attributes
					type: "button",
				},
				classes:    explodeClasses("border border-gray-300 bg-white px-3 py-2"),
				traits:     [
					{
						type:  TRAIT_SECTION_HEADER,
						label: "General settings",
					},
					{
						type:    "select",
						name:    "type",
						default: "button",
						options: button_types.map((type) => ({
							name:  type,
							value: type,
						})),
					},
					"value",
					"id",
					"name",
					{
						type:  "text",
						name:  "form",
						label: "Form ID",
					},
					{
						type: "checkbox",
						name: "disabled",
					},
					{
						type:  "checkbox",
						name:  "autofocus",
						label: "Auto focus",
					},
				],
				components: [
					{
						type:    "textnode",
						content: "Click me, i'm a button!",
					},
				],

			},
		},
	});
};