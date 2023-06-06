import { ITraitView } from "grapesjs";
import { explodeClasses } from "@open-press/utility";
import { TraitHorizontalSeparatorExtraSettings } from "@open-press/interfaces";

export const TraitHorizontalSeparator: ITraitView = {
	noLabel: true,
	templateInput(
		{
			trait,
			component,
			elInput,
		},
	): string {
		return "";
	},
	createInput(
		{
			trait,
			component,
			elInput,
		},
	): string | HTMLElement {
		const {
			      additional_classes,
		      } = trait.get("default") as TraitHorizontalSeparatorExtraSettings;

		const element = document.createElement("hr");
		element.classList.add(...explodeClasses("border border-gray-400"));

		if (additional_classes) {
			element.classList.add(...explodeClasses(additional_classes));
		}

		return element;
	},
};