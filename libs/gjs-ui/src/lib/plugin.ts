import { Editor } from "@grapesjs/index";
import { BasicActions, PanelSwitcherPanel, ResizableLayersPanel, TopPanel } from "./panels";

export const UiPlugin = (editor: Editor) => {
	editor.Panels.getPanels()
	      .reset([
		      TopPanel,
		      BasicActions,
		      ResizableLayersPanel,
		      PanelSwitcherPanel,
	      ]);
};