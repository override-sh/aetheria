import { Editor } from "grapesjs";
import { TRAIT_SECTION_HEADER } from "@open-press/gjs-ui";
import { OpenScriptEditorModalOptions } from "../commands";
import { OPEN_SCRIPT_EDITOR_MODAL } from "../commands/names";


export const ScriptComponent = (editor: Editor) => {
	editor.Components.addType("script-custom", {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el: HTMLElement) => el.tagName === "SCRIPT",

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "script",
				name:       "Script",
				badgable:   false,
				stylable:   false,
				copyable:   false,
				resizable:  false,
				droppable:  false, // Can't drop other elements inside
				attributes: { // Default attributes
					type: "text/javascript",
				},
				traits:     [
					{
						type:  TRAIT_SECTION_HEADER,
						label: "General settings",
					},
					{
						type: "text",
						name: "type",
					},
					"src",
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
								id:   "same-origin",
								name: "Same origin",
							},
							{
								id:   "strict-origin",
								name: "Strict origin",
							},
							{
								id:   "strict-origin-when-cross-origin",
								name: "Strict origin when cross origin",
							},
							{
								id:   "unsafe-url",
								name: "Unsafe url",
							},
						],
					},
					{
						type:       "checkbox",
						name:       "nomodule",
						label:      "No module",
						valueTrue:  "true",
						valueFalse: "false",
					},
					{
						type:  "text",
						name:  "integrity",
						label: "Integrity hash",
					},
					{
						type:  "checkbox",
						name:  "defer",
						label: "Defer loading",
					},
					{
						type:  "checkbox",
						name:  "async",
						label: "Async loading",
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
						type:    "button",
						text:    "Edit script content",
						full:    true,
						command: OPEN_SCRIPT_EDITOR_MODAL,
					},
				],
			},
			init() {
				const content = this.get("content");
				if (!content) {
					this.em.Commands.run(OPEN_SCRIPT_EDITOR_MODAL, {
						component: this,
					} as OpenScriptEditorModalOptions);
				}
			},
		},
	});
};