import { Editor } from "grapesjs";
import { explodeClasses, GrapesJsUtility } from "@open-press/utility";
import { TRAIT_SECTION_HEADER } from "@open-press/gjs-ui";

export const ColumnsComponent = (editor: Editor) => {
	editor.Components.addType("columns", {
		isComponent: (el: HTMLElement) => ["DIV"].includes(el.tagName) && el.classList.contains("columns-component"),

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName:    "div",
				classes:    explodeClasses("columns-component text-base p-4 relative flex flex-nowrap basis-full"),
				droppable:  true,
				attributes: {
					columns:   1,
					direction: "row",
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
						step: 1,
					},
					{
						type:    "select",
						name:    "direction",
						options: [
							{ value:  "row",
								name: "Row",
							},
							{ value:  "row-reverse",
								name: "Row reverse",
							},
							{ value:  "column",
								name: "Column",
							},
							{ value:  "column-reverse",
								name: "Column reverse",
							},
						],
					},
				],
				components: [
					{
						type: "container",
					},
				],
			},

			init() {
				GrapesJsUtility.component.reInitHookedAttributesChanges(this);
				GrapesJsUtility.component.hookAttributesChanges(this);

				this.on("component:update:components", this.handleComponentsUpdate);
			},

			handleDirectionAttributeChange() {
				const direction = this.getAttributes()["direction"];
				let classes: string[] = this.getClasses();

				classes = classes.filter((className) => !(className.startsWith("flex-row") ||
				                                          className.startsWith("flex-col")));

				switch (direction) {
					case "row":
						classes.push("flex-row");
						break;
					case "row-reverse":
						classes.push("flex-row-reverse");
						break;
					case "column":
						classes.push("flex-col");
						break;
					case "column-reverse":
						classes.push("flex-col-reverse");
						break;
				}

				this.set("classes", classes as any);
			},

			handleColumnsAttributeChange() {
				const columns = this.getAttributes()["columns"];
				const components = this.get("components");

				if (!components) {
					return;
				}

				const componentsCount = components.length;
				if (columns > componentsCount) {
					for (let i = 0; i < columns - componentsCount; i++) {
						components.add({
							type: "container",
						});
					}
				}
				else if (columns < componentsCount) {
					for (let i = 0; i < componentsCount - columns; i++) {
						components.pop();
					}
				}

				this.set("components", components);
			},

			handleComponentsUpdate() {
				const columns = this.getAttributes()["columns"];
				const components = this.get("components");

				if (!components) {
					return;
				}

				if (components.length !== columns) {
					this.handleColumnsAttributeChange();
				}
			},
		},
	});
};