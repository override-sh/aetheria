import { Component, Editor } from "grapesjs";
import { GrapesJsUtility } from "@open-press/utility";
import { ComponentAttributeChangeHandlerOptions, TraitHorizontalSeparatorExtraSettings } from "@open-press/interfaces";
import { TRAIT_HORIZONTAL_SEPARATOR, TRAIT_SECTION_HEADER } from "@open-press/gjs-ui";

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
	| "hidden";
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
				traits: [
					{
						type:  TRAIT_SECTION_HEADER,
						label: "General settings",
					},
					{
						type:    "select",
						name:    "type",
						default: "text",
						text:    "text",
						options: input_types.map((type) => ({
							name:  type,
							value: type,
						})),
					},
					"value",
					"id",
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
					{
						type:  "number",
						name:  "maxlength",
						min:   0,
						step:  1,
						label: "Max length",
					},
					{
						type:  "checkbox",
						name:  "autofocus",
						label: "Auto focus",
					},
					{
						type:  "checkbox",
						name:  "autocomplete",
						label: "Auto complete",
					},

					{
						type:    TRAIT_HORIZONTAL_SEPARATOR,
						default: {
							         additional_classes: "mt-4 -mb-2",
						         } as TraitHorizontalSeparatorExtraSettings,
					},
					{
						type:  TRAIT_SECTION_HEADER,
						label: "Type specific settings",
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

				GrapesJsUtility.component.addTraitsOrReset(
					this,
					([
						"number",
						"range",
					] as InputTypes[]).includes(value),
					[
						{
							type: "number",
							name: "min",
							step: 1,
						},
						{
							type: "number",
							name: "max",
							step: 1,
						},
					],
					options,
				);

				GrapesJsUtility.component.addTraitsOrReset(
					this,
					([
						"date",
						"datetime-local",
						"month",
						"week",
						"time",
					] as InputTypes[]).includes(value),
					[
						{
							type: "text",
							name: "min",
						},
						{
							type: "text",
							name: "max",
						},
					],
					options,
				);

				GrapesJsUtility.component.addTraitOrReset(
					this,
					([
						"file",
						"email",
					] as InputTypes[]).includes(value),
					{
						type: "checkbox",
						name: "multiple",
					},
					options,
				);

				GrapesJsUtility.component.addTraitOrReset(
					this,
					([
						"text",
						"date",
						"search",
						"tel",
						"url",
						"email",
						"password",
					] as InputTypes[]).includes(value),
					{
						type: "text",
						name: "pattern",
					},
					options,
				);

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
						type: "text",
						name: "placeholder",
					},
					options,
				);

				GrapesJsUtility.component.addTraitOrReset(
					this,
					([
						"number",
						"range",
						"date",
						"datetime-local",
						"month",
						"time",
						"week",
					] as InputTypes[]).includes(value),
					{
						type: "number",
						name: "step",
						min:  0,
					},
					options,
				);
			},
		},
	});
};