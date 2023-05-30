import Button from "@grapesjs/panels/model/Button";
import { IMPORT_CODE } from "../commands";

export const ImportCodeButton: Button = {
	id:      "import-code",
	active:  false,
	label:   `<i class="ti ti-file-import"></i>`,
	command: IMPORT_CODE,
} as Button & { label: string };