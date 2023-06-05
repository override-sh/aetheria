import { CommandObject, Editor } from "grapesjs";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { html } from "@codemirror/lang-html";
import { basicSetup } from "codemirror";

const SCRIPT_TEMPLATE = `<!-- 
Write the code you want to import here.
It will be inserted into the current page replacing the whole document.
You can include also <style> tags that will be parsed as global css definition.
-->

<body>
	<div class="container-component">
		<p>
			This is an example of imported code
		</p>
	</div>
	<style>
		.container-component {
			background-color: red;
		}
	</style>
</body>
`;

const openModal = (editor: Editor) => {
	editor.Modal.open({
		title:   "Import code",
		content: `
				<div id="editor-container" class="min-w-full min-h-20"></div>
				<div class="flex items-center my-2">
					<button 
						id="save-script" 
						class="ml-auto border border-green-400 text-sm text-green-400 font-semibold rounded px-3 py-2 
							transition-all duration-300 hover:bg-green-500 hover:text-white">
						Import
					</button>
				</div>
			`,
	});
};

const hookNextModalOpening = (editor: Editor) => {
	editor.Modal.onceOpen(() => {
		const codemirror_editor = new EditorView({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			parent: document.getElementById("editor-container")!,

			state: EditorState.create({
				doc:        SCRIPT_TEMPLATE,
				extensions: [
					basicSetup,
					darcula,
					html({
						autoCloseTags:    true,
						matchClosingTags: true,
						selfClosingTags:  true,
					}),
				],
			}),
		});

		document.getElementById("save-script")
		        ?.addEventListener("click", () => {
			        editor.setComponents(codemirror_editor.state.doc.toString());
			        editor.Modal.close();
		        });
	});
};

export const openImportCodeModal: CommandObject = {
	run: (
		     editor,
	     ) => {
		hookNextModalOpening(editor);
		openModal(editor);
	},
};