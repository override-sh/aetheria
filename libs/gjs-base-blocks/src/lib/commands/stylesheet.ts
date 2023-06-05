import { CommandObject, Component } from "grapesjs";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { css } from "@codemirror/lang-css";
import { basicSetup } from "codemirror";

export interface OpenStylesheetEditorModalOptions {
	component?: Component;
}

const STYLESHEET_TEMPLATE = `.insert-your-selector {
	/* 
	 * Write your custom css code here
	 * The following code will be inserted in a proper <style> tag;
	 */
	 
	background-color: red;
}
`;

const openModal = (component: Component) => {
	component.em.Modal.open({
		title:   "Stylesheet content definition",
		content: `
				<div id="editor-container" class="min-w-full min-h-20"></div>
				<div class="flex items-center my-2">
					<button 
						id="save-script" 
						class="ml-auto border border-green-400 text-sm text-green-400 font-semibold rounded px-3 py-2 
							transition-all duration-300 hover:bg-green-500 hover:text-white">
						Save
					</button>
				</div>
			`,
	});
};

const hookNextModalOpening = (component: Component) => {
	component.em.Modal.onceOpen(() => {
		const codemirror_editor = new EditorView({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			parent: document.getElementById("editor-container")!,

			state: EditorState.create({
				doc:        STYLESHEET_TEMPLATE,
				extensions: [
					basicSetup,
					darcula,
					css(),
				],
			}),
		});

		document.getElementById("save-script")
		        ?.addEventListener("click", () => {
			        component.set("content", codemirror_editor.state.doc.toString());
			        component.em.Modal.close();
		        });
	});
};

export const openStylesheetEditorModal: CommandObject = {
	run: (
		     editor,
		     sender,
		     options: OpenStylesheetEditorModalOptions,
	     ) => {
		const component = options.component || editor.getSelected();

		if (!component) {
			console.error("No component selected");
			return;
		}

		hookNextModalOpening(component);
		openModal(component);
	},
};