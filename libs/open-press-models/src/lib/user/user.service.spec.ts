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
import {HashModule, HashService} from "@override/open-press-support";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { ConfigModule } from "@nestjs/config";
import { Connection } from "mongoose";
import {UserNotFoundError, VerificationEmailSentError} from "./errors";

describe("UserService", () => {
	let service: UserService, hash_service: HashService;

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
    hash_service = module.get(HashService)

		const connection = module.get<Connection>(getConnectionToken(DATABASE_CONNECTIONS.default));
		await connection.dropDatabase();
	});

	it("can create user", async () => {
		const value = await service.create({
			name:     "Test user",
			email:    "jd@example.com",
			password: "password",
		});

		expect(value).toHaveProperty("_id");
		expect(value).toHaveProperty("name");
		expect(value).toHaveProperty("email");
		expect(value).toHaveProperty("password");
		expect(value).toHaveProperty("created_at");
		expect(value).toHaveProperty("updated_at");
		expect(value.name).toEqual("Test user");
		expect(value.email).toEqual("jd@example.com");
		expect(await hash_service.compare("password", value.password)).toBeTruthy();
	});

	it("can update user by id", async () => {
		const original_user = await service.create({
			name:     "Test user",
			email:    "jd@example.com",
			password: "password",
		});

    const value = await service.update(
      original_user.id,
      {
        name: "test"
      }
    )

		expect(value).toHaveProperty("_id");
		expect(value).toHaveProperty("name");
		expect(value).toHaveProperty("email");
		expect(value).toHaveProperty("password");
		expect(value).toHaveProperty("created_at");
		expect(value).toHaveProperty("updated_at");

    expect(value.id).toEqual(original_user.id)
		expect(value.name).toEqual("test");
		expect(value.email).toEqual("jd@example.com");
		expect(await hash_service.compare("password", value.password)).toBeTruthy();
	});

	it("can update user by instance", async () => {
		const original_user = await service.create({
			name:     "Test user",
			email:    "jd@example.com",
			password: "password",
		});

    const value = await service.update(
      original_user,
      {
        name: "test"
      }
    )

		expect(value).toHaveProperty("_id");
		expect(value).toHaveProperty("name");
		expect(value).toHaveProperty("email");
		expect(value).toHaveProperty("password");
		expect(value).toHaveProperty("created_at");
		expect(value).toHaveProperty("updated_at");

    expect(value.id).toEqual(original_user.id)
		expect(value.name).toEqual("test");
		expect(value.email).toEqual("jd@example.com");
		expect(await hash_service.compare("password", value.password)).toBeTruthy();
	});

	it("cannot update non existing user", async () => {
    expect(async () => await service.update(
      "fake.id",
      {
        name: "test"
      }
    )).toThrow(UserNotFoundError)
	});

	it("cannot update user email if email is unchanged", async () => {
    const original_user = await service.create({
      name:     "Test user",
      email:    "jd@example.com",
      password: "password",
    });

    const value = await service.update(
      original_user,
      {
        email:    "jd@example.com",
      }
    )

    expect(value).toEqual(original_user)
	});

	it("can update user password", async () => {
    const original_user = await service.create({
      name:     "Test user",
      email:    "jd@example.com",
      password: "password",
    });

    const value = await service.update(
      original_user,
      {
        password:    "test",
      }
    )

    expect(await hash_service.compare("test", value.password)).toBeTruthy()
	});

	it("cannot update user email if email is already used", async () => {
    const original_user = await service.create({
      name:     "Test user",
      email:    "jd@example.com",
      password: "password",
    });

    const email_placeholder = await service.create({
      name:     "u1",
      email:    "test@example.com",
      password: "password",
    });

    expect(async () => await service.update(
      original_user,
      {
        email:    "test@example.com",
      }
    )).toThrow(VerificationEmailSentError.make())
	});
});
