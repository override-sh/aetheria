import { Module } from "@nestjs/common";
import { HashService } from "./hash.service";
import { ConfigModule } from "@nestjs/config";
import { authConfig } from "@open-press/backend-config";

@Module({
	imports:   [
		ConfigModule.forFeature(authConfig),
	],
	providers: [HashService],
	exports:   [HashService],
})
export class HashModule {
}
