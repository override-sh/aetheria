import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import {
	authConfig,
	DATABASE_CONFIG_KEY,
	DATABASE_CONNECTIONS,
	databaseConfig,
	DatabaseConfig,
	EnvValidation,
} from "@override/backend-config";
import { HashModule } from "@override/open-press-support";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { ConfigModule } from "@nestjs/config";
import { Connection } from "mongoose";

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports:   [
				ConfigModule.forRoot({
					isGlobal:        true,
					expandVariables: true,
					load:            [
						databaseConfig,
						authConfig,
					],
					validate:        (config: Record<string, any>) => EnvValidation.instance.validateEnv(config),
				}),
				MongooseModule.forRootAsync({
					inject:         [DATABASE_CONFIG_KEY],
					useFactory:     async (db_config: DatabaseConfig): Promise<MongooseModuleFactoryOptions> => {
						console.log(DATABASE_CONNECTIONS.default, `mongodb://` +
						                                          `${db_config[DATABASE_CONNECTIONS.default].username}:` +
						                                          `${db_config[DATABASE_CONNECTIONS.default].password}@` +
						                                          `${db_config[DATABASE_CONNECTIONS.default].host}:` +
						                                          `${db_config[DATABASE_CONNECTIONS.default].port}/` +
						                                          `${db_config[DATABASE_CONNECTIONS.default].database}`);
						return {
							// connectionName: DATABASE_CONNECTIONS.default,
							dbName: db_config[DATABASE_CONNECTIONS.default].database,
							uri:    `mongodb://` +
							        `${db_config[DATABASE_CONNECTIONS.default].username}:` +
							        `${db_config[DATABASE_CONNECTIONS.default].password}@` +
							        `${db_config[DATABASE_CONNECTIONS.default].host}:` +
							        `${db_config[DATABASE_CONNECTIONS.default].port}/`,
						};
					},
					connectionName: DATABASE_CONNECTIONS.default,
				}),
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
			providers: [
				UserService,
			],
		})
		                                        .compile();

		service = module.get<UserService>(UserService);

		const connection = module.get<Connection>(getConnectionToken(DATABASE_CONNECTIONS.default));
		await connection.dropDatabase();
	});

	it("can create user", async () => {
		const value = await service.create({
			name:     "Test User",
			email:    "jd@example.com",
			password: "password",
		});

		console.log(typeof value);
		expect(value)
			.toHaveProperty([
				"_id",
				"name",
				"email",
				"password",
				"created_at",
				"updated_at",
			]);
	});
});
