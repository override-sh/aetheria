import { DeviceName } from "../devices";
import { CommandObject } from "grapesjs";

export const makeSetDeviceCommand = (device: DeviceName): CommandObject => {
	return {
		run: (editor) => {
			editor.setDevice(device);
		},
	};
};