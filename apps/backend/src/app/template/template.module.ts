import { Module } from "@nestjs/common";
import { TemplateController } from "./template.controller";
import { TemplateModelModule } from "@open-press/models";

@Module({
	imports:     [
		TemplateModelModule,
	],
	controllers: [TemplateController],
})
export class TemplateModule {
}
