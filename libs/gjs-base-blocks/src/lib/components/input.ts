import { Editor } from "@grapesjs/index";
import Component from "@grapesjs/dom_components/model/Component";
import { GrapesJsUtility } from "@override/utility";
import { ComponentAttributeChangeHandlerOptions } from "@override/open-press-interfaces";
import { capitalize } from "@grapesjs/utils/mixins";

type InputTypes =
	"text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "search"
	| "date"
	| "time"
	| "datetime-local"
	| "month"
	| "week"
	| "color"
	| "range"
	| "file"
	| "hidden"
	| "image"
	| "reset"
	| "submit"
	| "button";
const input_types: InputTypes[] = [
	"text",
	"email",
	"password",
	"number",
	"tel",
	"url",
	"search",
	"date",
	"time",
	"datetime-local",
	"month",
	"week",
	"color",
	"range",
	"file",
	"hidden",
	"image",
	"reset",
	"submit",
	"button",
];


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
					// common traits
					{
						type:    "select",
						name:    "type",
						default: "text",
						text:    "text",
						options: input_types.map((type) => ({
							name:  capitalize(type),
							value: type,
						})),
					},
					"value",
					"name",
					{
						type:  "checkbox",
						name:  "readonly",
						label: "Read only",
					},
					{
						type: "checkbox",
						name: "disabled",
					},
					{
						type: "checkbox",
						name: "required",
					},

					"placeholder",
					{
						type:  "number",
						name:  "maxlength",
						min:   0,
						step:  1,
						label: "Max length",
					},
					"pattern",
					{
						type:  "checkbox",
						name:  "multiple",
						label: "Multiple",
						text:  "Multiple text",
					},
				],
			},

			init() {
				GrapesJsUtility.component.reInitHookedAttributesChanges(this);
				GrapesJsUtility.component.hookAttributesChanges(this);
			},

			handleTypeAttributeChange(
				component: Component,
				value: InputTypes,
				options: ComponentAttributeChangeHandlerOptions,
			) {
				// whether to reset the attributes
				// const should_reset = !options.stop_propagation && !options.init;

				GrapesJsUtility.component.addTraitOrReset(
					this,
					([
						"text",
						"search",
						"tel",
						"url",
						"email",
						"password",
					] as InputTypes[]).includes(value),
					{
						type: "number",
						name: "size",
						min:  0,
						step: 1,
					},
					options,
				);
				/*if ((["text", "search", "tel", "url", "email", "password"] as InputTypes[]).includes(value)) {
				 this.addTrait({
				 type:  "number",
				 name:  "size",
				 min:   0,
				 step:  1,
				 },);
				 }
				 if (!options.stop_propagation && !options.init) {
				 GrapesJsUtility.component.resetAttributes(this, {
				 multiple: null,
				 });
				 this.removeTrait("multiple");
				 }*/
			},
		},
	});
};