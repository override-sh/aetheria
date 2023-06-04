import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup } from "codemirror";
import { CommandObject, Component } from "grapesjs";

export interface OpenScriptEditorModalOptions {
	component?: Component;
}

const SCRIPT_TEMPLATE = `// Write your custom javascript code here
// The following code will be executed on page load and will be inserted 
// in a proper <script> tag;

console.log("This is a custom script running from the editor");
`;

const openModal = (component: Component) => {
	component.em.Modal.open({
		title:   "Script content definition",
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
				doc:        SCRIPT_TEMPLATE,
				extensions: [
					basicSetup,
					darcula,
					javascript({
						jsx:        false,
						typescript: false,
					}),
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

export const openScriptEditorModal: CommandObject = {
	run: (
		     editor,
		     sender,
		     options: OpenScriptEditorModalOptions,
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