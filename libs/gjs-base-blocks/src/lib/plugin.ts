import { Editor } from "grapesjs";
import {
	ButtonComponent,
	ColumnsComponent,
	FormComponent,
	GridComponent,
	HeaderComponent,
	InputComponent,
	ParagraphComponent,
	ScriptComponent,
} from "./components";
import {
	ButtonBlock,
	ColumnsBlock,
	ContainerBlock,
	FormBlock,
	GridBlock,
	HeaderBlock,
	ImageBlock,
	InputBlock,
	LabelBlock,
	ScriptBlock,
	StylesheetBlock,
	TextBlock,
} from "./blocks";
import { ContainerComponent } from "./components/container";
import {
	OPEN_SCRIPT_EDITOR_MODAL,
	OPEN_STYLESHEET_EDITOR_MODAL,
	openScriptEditorModal,
	openStylesheetEditorModal,
} from "./commands";
import { StyleComponent } from "./components/style";

export const BaseBlocksPlugin = (editor: Editor) => {
	editor.Commands.add(OPEN_SCRIPT_EDITOR_MODAL, openScriptEditorModal);
	editor.Commands.add(OPEN_STYLESHEET_EDITOR_MODAL, openStylesheetEditorModal);

	InputComponent(editor);
	FormComponent(editor);
	HeaderComponent(editor);
	ParagraphComponent(editor);
	ContainerComponent(editor);
	ColumnsComponent(editor);
	GridComponent(editor);
	ButtonComponent(editor);
	ScriptComponent(editor);
	StyleComponent(editor);

	// basic section
	HeaderBlock(editor);
	TextBlock(editor);
	ImageBlock(editor);
	ContainerBlock(editor);
	ColumnsBlock(editor);
	GridBlock(editor);
	ScriptBlock(editor);
	StylesheetBlock(editor);

	// form section
	InputBlock(editor);
	FormBlock(editor);
	LabelBlock(editor);
	ButtonBlock(editor);
};