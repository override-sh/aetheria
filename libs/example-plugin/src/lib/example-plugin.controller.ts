import { Controller, Get } from "@nestjs/common";
import { ExamplePluginService } from "./example-plugin.service";

@Controller("example-plugin")
export class ExamplePluginController {
	constructor(private examplePluginService: ExamplePluginService) {}

	@Get()
	public async exampleControllerMethod(): Promise<{ example: string }> {
		return await this.examplePluginService.exampleMethod();
	}
}
