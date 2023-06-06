import { Test } from "@nestjs/testing";
import { ExamplePluginController } from "./example-plugin.controller";
import { ExamplePluginService } from "./example-plugin.service";

describe("ExamplePluginController", () => {
	let controller: ExamplePluginController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers:   [ExamplePluginService],
			controllers: [ExamplePluginController],
		}).compile();

		controller = module.get(ExamplePluginController);
	});

	it("should be defined", () => {
		expect(controller).toBeTruthy();
	});
});
