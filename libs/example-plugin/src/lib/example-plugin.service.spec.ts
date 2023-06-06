import { Test } from "@nestjs/testing";
import { ExamplePluginService } from "./example-plugin.service";

describe("ExamplePluginService", () => {
	let service: ExamplePluginService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ExamplePluginService],
		}).compile();

		service = module.get(ExamplePluginService);
	});

	it("should be defined", () => {
		expect(service).toBeTruthy();
	});
});
