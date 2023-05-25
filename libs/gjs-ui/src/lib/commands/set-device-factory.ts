import { DeviceName } from "../devices";
import { CommandObject } from "@grapesjs/commands/view/CommandAbstract";

export const makeSetDeviceCommand = (device: DeviceName): CommandObject => {
	return {
		run: (editor) => {
			editor.setDevice(device);
		},
	};
};