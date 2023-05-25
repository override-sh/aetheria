import { Editor } from "@grapesjs/index";
import { BasicActions, DevicesPanel, PanelSwitcherPanel, ResizableLayersPanel, TopPanel } from "./panels";
import { DeviceDesktop, DeviceMobile } from "./devices";
import {
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
};