import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { DATABASE_CONNECTIONS } from "@open-press/backend-config";
import { HashModule } from "@open-press/support";

@Module({
	imports:   [
		MongooseModule.forFeature(
			[
				{
					name:   User.name,
					schema: UserSchema,
				},
			],
			DATABASE_CONNECTIONS.default,
		),
		HashModule,
	],
	providers: [UserService],
	exports:   [UserService],
})
export class UserModelModule {
}
