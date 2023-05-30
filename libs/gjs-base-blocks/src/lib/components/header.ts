import { Editor } from "@grapesjs/index";
import { explodeClasses, GrapesJsUtility } from "@override/utility";
import Component from "@grapesjs/dom_components/model/Component";
import { ComponentAttributeChangeHandlerOptions } from "@override/open-press-interfaces";

export const HeaderComponent = (editor: Editor) => {
	editor.Components.addType("header", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => [
			"H1",
			"H2",
			"H3",
			"H4",
			"H5",
			"H6",
		].includes(el.tagName),

		extend: "text",

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "h1",
				droppable:  true,
				attributes: { // Default attributes
					order: 1,
				},
				traits:     [
					{
						type: "number",
						name: "order",
						min:  1,
						max:  6,
						step: 1,
					},
					"id",
				],
				classes:    explodeClasses("font-semibold text-2xl p-2"),
				components: [
					{
						type:    "textnode",
						content: "This is a header",
					},
				],
			},

			init() {
				GrapesJsUtility.component.reInitHookedAttributesChanges(this);
				GrapesJsUtility.component.hookAttributesChanges(this);
			},

			handleOrderAttributeChange(
				component: Component,
				value: string,
				options: ComponentAttributeChangeHandlerOptions,
			) {
				const parsed_value = +value;

				if (parsed_value < 1 || parsed_value > 6 || isNaN(parsed_value)) {
					component.setAttributes({
						order: 1,
					});
					return;
				}

				component.set("tagName", `h${parsed_value}`);
			},
		},
	});
};