import { Module } from "@nestjs/common";
import { ExamplePluginController } from "./example-plugin.controller";
import { ExamplePluginService } from "./example-plugin.service";

@Module({
	controllers: [ExamplePluginController],
	providers:   [ExamplePluginService],
	exports:     [ExamplePluginService],
})
export class ExamplePluginModule {
}
