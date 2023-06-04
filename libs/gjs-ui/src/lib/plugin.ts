import { Editor } from "grapesjs";
import { BasicActions, DevicesPanel, PanelSwitcherPanel, ResizableLayersPanel, TopPanel } from "./panels";
import { DeviceDesktop, DeviceMobile } from "./devices";
import {
	IMPORT_CODE,
	openImportCodeModal,
	SET_DEVICE_DESKTOP,
	SET_DEVICE_MOBILE,
	SetDeviceDesktopCommand,
	SetDeviceMobileCommand,
	SHOW_BLOCKS,
	SHOW_LAYERS,
	SHOW_STYLES,
	SHOW_TRAITS,
	ShowBlocksCommand,
	ShowLayersCommand,
	ShowStylesCommand,
	ShowTraitsCommand,
} from "./commands";
import {
	TRAIT_HORIZONTAL_SEPARATOR,
	TRAIT_SECTION_HEADER,
	TraitHorizontalSeparator,
	TraitSectionHeader,
} from "./traits";

export const UiPlugin = (editor: Editor) => {
	editor.Panels.getPanels()
	      .reset([
		      TopPanel,
		      BasicActions,
		      ResizableLayersPanel,
		      PanelSwitcherPanel,
		      DevicesPanel,
	      ]);

	editor.Devices.devices.reset([
		DeviceDesktop,
		DeviceMobile,
	]);

	const ui_commands = [
		{
			id:      SHOW_LAYERS,
			command: ShowLayersCommand,
		},
		{
			id:      SHOW_TRAITS,
			command: ShowTraitsCommand,
		},
		{
			id:      SHOW_STYLES,
			command: ShowStylesCommand,
		},
		{
			id:      SHOW_BLOCKS,
			command: ShowBlocksCommand,
		},
		{
			id:      SET_DEVICE_DESKTOP,
			command: SetDeviceDesktopCommand,
		},
		{
			id:      SET_DEVICE_MOBILE,
			command: SetDeviceMobileCommand,
		},
		{
			id:      IMPORT_CODE,
			command: openImportCodeModal,
		},
	];
	ui_commands.forEach((
			{
				id,
				command,
			},
		) => {
			editor.Commands.add(id, command);
		},
	);


	const ui_traits = [
		{
			id:    TRAIT_SECTION_HEADER,
			trait: TraitSectionHeader,
		},
		{
			id:    TRAIT_HORIZONTAL_SEPARATOR,
			trait: TraitHorizontalSeparator,
		},
	];
	ui_traits.forEach((
			{
				id,
				trait,
			},
		) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			editor.Traits.addType(id, trait);
		},
	);


	editor.onReady(() => {
		editor.Styles.getSector("general")
		      .addProperty(
			      {
				      type:     "number",
				      default:  "0",
				      name:     "z-index",
				      property: "z-index",
				      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
				      // @ts-ignore
				      min: 0,
			      },
			      {},
		      );
	});
};