import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { DATABASE_CONNECTIONS } from "@override/backend-config";
import { HashModule } from "@override/open-press-support";

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
	exports:   [],
})
export class UserModelModule {
}
