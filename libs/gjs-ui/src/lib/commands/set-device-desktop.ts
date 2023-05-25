import { makeSetDeviceCommand } from "./set-device-factory";
import { DEVICE_DESKTOP } from "../devices";

export const SetDeviceDesktopCommand = makeSetDeviceCommand(DEVICE_DESKTOP);