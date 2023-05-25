import { makeSetDeviceCommand } from "./set-device-factory";
import { DEVICE_MOBILE } from "../devices";

export const SetDeviceMobileCommand = makeSetDeviceCommand(DEVICE_MOBILE);