import { CommandObject, Editor } from "grapesjs";
import { NullableHTMLElement } from "@open-press/interfaces";

type ShowCommandType = CommandObject & {
	getEditorRow(editor: Editor): HTMLElement;
	getElement(editor: Editor): HTMLElement;
};

export const makeShowCommand = (element_selector: string): CommandObject => {
	return {
		getEditorRow(editor: Editor): HTMLElement {
			const row: NullableHTMLElement = editor.getContainer()
			                                       ?.closest(".editor-row") || null;

			if (!row) {
				throw new Error("Could not find editor row");
			}

			return row;
		},

		getElement(
			this: ShowCommandType,
			editor: Editor,
		): HTMLElement {
			const row = this.getEditorRow(editor);
			const element: NullableHTMLElement = row.querySelector(element_selector);

			if (!element) {
				throw new Error(`Could not find "${element_selector}" element`);
			}

			return element;
		},

		run(
			this: ShowCommandType,
			editor,
			sender,
		) {
			const element = this.getElement(editor);
			element.style.display = "";
		},

		stop(
			this: ShowCommandType,
			editor,
			sender,
		) {
			const element = this.getElement(editor);
			element.style.display = "none";
		},
	};
};