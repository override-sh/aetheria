import { Editor } from "grapesjs";
import { explodeClasses, GrapesJsUtility } from "@open-press/utility";
import { TRAIT_SECTION_HEADER } from "@open-press/gjs-ui";

export const GridComponent = (editor: Editor) => {
	editor.Components.addType("grid", {
		isComponent: (el: HTMLElement) => ["DIV"].includes(el.tagName) && el.classList.contains("grid-component"),

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "div",
				classes:    explodeClasses("grid-component text-base p-4 relative grid grid-cols-1 grid-rows-1"),
				droppable:  true,
				attributes: {
					columns: 1,
					rows:    1,
				},
				traits:     [
					{
						type:  TRAIT_SECTION_HEADER,
						label: "General settings",
					},
					{
						type: "number",
						name: "columns",
						min:  1,
						max:  12,
						step: 1,
					},
					{
						type: "number",
						name: "rows",
						min:  1,
						max:  6,
						step: 1,
					},
				],
			},

			init() {
				GrapesJsUtility.component.reInitHookedAttributesChanges(this);
				GrapesJsUtility.component.hookAttributesChanges(this);
			},

			handleColumnsAttributeChange() {
				const columns = this.getAttributes()["columns"];
				let classes: string[] = this.getClasses();

				classes = classes.filter((className) => !className.startsWith("grid-cols-"));
				classes.push(`grid-cols-${columns}`);

				this.set("classes", classes as any);
			},

			handleRowsAttributeChange() {
				const rows = this.getAttributes()["rows"];
				let classes: string[] = this.getClasses();

				classes = classes.filter((className) => !className.startsWith("grid-rows-"));
				classes.push(`grid-rows-${rows}`);

				this.set("classes", classes as any);
			},
		},
	});
};