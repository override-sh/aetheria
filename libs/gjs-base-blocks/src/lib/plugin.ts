import { Editor } from "@grapesjs/index";
import { FormComponent, InputComponent } from "./components";
import { FormBlock, InputBlock } from "./blocks";

export const BaseBlocksPlugin = (editor: Editor) => {
	InputComponent(editor);
	FormComponent(editor);

	InputBlock(editor);
	FormBlock(editor);
};