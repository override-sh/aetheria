import { Component, Editor } from "grapesjs";
import { TRAIT_SECTION_HEADER } from "@open-press/gjs-ui";
import { OPEN_STYLESHEET_EDITOR_MODAL, OpenStylesheetEditorModalOptions } from "../commands";
import { GrapesJsUtility } from "@open-press/utility";
import { ComponentAttributeChangeHandlerOptions } from "@open-press/interfaces";


export const StyleComponent = (editor: Editor) => {
	editor.Components.addType("style-custom", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => [
			"STYLE",
			"LINK",
		].includes(el.tagName),

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "style",
				name:       "Stylesheet",
				badgable:   false,
				stylable:   false,
				copyable:   false,
				resizable:  false,
				droppable:  false, // Can't drop other elements inside
				attributes: { // Default attributes
					linkType: "custom",
				},
				traits:     [
					{
						type:  TRAIT_SECTION_HEADER,
						label: "General settings",
					},
					{
						type:    "select",
						name:    "linkType",
						label:   "Type",
						options: [
							{
								id:   "custom",
								name: "custom",
							},
							{
								id:   "link",
								name: "link",
							},
						],
					},
				],
			},
			init() {
				GrapesJsUtility.component.reInitHookedAttributesChanges(this);
				GrapesJsUtility.component.hookAttributesChanges(this);

				const type = this.getAttributes({
					noStyle: true,
					noClass: true,
				}).linkType;
				if (type === "custom") {
					const content = this.get("content");
					if (!content) {
						this.em.Commands.run(OPEN_STYLESHEET_EDITOR_MODAL, {
							component: this,
						} as OpenStylesheetEditorModalOptions);
					}
				}
			},

			handleLinkTypeAttributeChange(
				component: Component,
				value: "link" | "custom",
				options: ComponentAttributeChangeHandlerOptions,
			) {
				console.log("handleLinkTypeAttributeChange", value, options);
				if (value === "link") {
					this.set("tagName", "link");
				}
				else {
					this.set("tagName", "style");
				}

				GrapesJsUtility.component.addTraitsOrReset(
					this,
					value === "custom",
					[
						{
							type: "button",
							name: "edit",
							text: "Edit stylesheet content",
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							nolabel: true,
							full:    true,
							command: OPEN_STYLESHEET_EDITOR_MODAL,
						},
					],
					options,
				);

				GrapesJsUtility.component.addTraitsOrReset(
					this,
					value === "link",
					[
						{
							type:  TRAIT_SECTION_HEADER,
							label: "Link settings",
							name:  "link-settings",
						},
						{
							type:    "select",
							name:    "crossorigin",
							label:   "Cross origin",
							options: [
								{
									id:   "",
									name: "None",
								},
								{
									id:   "anonymous",
									name: "Anonymous",
								},
								{
									id:   "use-credentials",
									name: "Use credentials",
								},
							],
						},
						{
							type: "text",
							name: "href",
						},
						{
							type:  "text",
							name:  "hreflang",
							label: "Href lang",
						},
						{
							type: "text",
							name: "media",
						},
						{
							type:    "select",
							name:    "referrerpolicy",
							label:   "Referrer policy",
							options: [
								{
									id:   "",
									name: "None",
								},
								{
									id:   "no-referrer",
									name: "No referrer",
								},
								{
									id:   "no-referrer-when-downgrade",
									name: "No referrer when downgrade",
								},
								{
									id:   "origin",
									name: "Origin",
								},
								{
									id:   "origin-when-cross-origin",
									name: "Origin when cross origin",
								},
								{
									id:   "unsafe-url",
									name: "Unsafe url",
								},
							],
						},
						{
							type:    "select",
							name:    "rel",
							label:   "Relation",
							default: "stylesheet",
							options: [
								{
									id:   "",
									name: "None",
								},
								{
									id:   "alternate",
									name: "Alternate",
								},
								{
									id:   "author",
									name: "Author",
								},
								{
									id:   "dns-prefetch",
									name: "DNS prefetch",
								},
								{
									id:   "help",
									name: "Help",
								},
								{
									id:   "icon",
									name: "Icon",
								},
								{
									id:   "license",
									name: "License",
								},
								{
									id:   "next",
									name: "Next",
								},
								{
									id:   "pingback",
									name: "Pingback",
								},
								{
									id:   "preconnect",
									name: "Preconnect",
								},
								{
									id:   "prefetch",
									name: "Prefetch",
								},
								{
									id:   "preload",
									name: "Preload",
								},
								{
									id:   "prerender",
									name: "Prerender",
								},
								{
									id:   "prev",
									name: "Prev",
								},
								{
									id:   "search",
									name: "Search",
								},
								{
									id:   "stylesheet",
									name: "Stylesheet",
								},
							],
						},
						{
							type: "text",
							name: "title",
						},
						{
							type:  "text",
							name:  "type",
							label: "MIME type",
						},
					],
					options,
				);
			},
		},
	});
};