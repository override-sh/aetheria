import { Module } from "@nestjs/common";
import { HookableService } from "./hookable.service";

@Module({
	providers: [HookableService],
	exports:   [HookableService],
})
export class ExtendibilityModule {
}
