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
import { HashModule, HashService } from "@override/open-press-support";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { ConfigModule } from "@nestjs/config";
import { Connection } from "mongoose";
import { UserNotFoundErrorFactory, VerificationEmailSentErrorFactory } from "./errors";
import { faker } from "@faker-js/faker";

const sample_id = "507f191e810c19729de860ea";
const user_basic_properties = {
	name:     "Test user",
	email:    "jd@example.com",
	password: "password",
};

describe("UserService", () => {
	let service: UserService,
	    hash_service: HashService;

	const hasUserProperties = (value: any) => {
		expect(value)
			.toHaveProperty("_id");
		expect(value)
			.toHaveProperty("name");
		expect(value)
			.toHaveProperty("email");
		expect(value)
			.toHaveProperty("password");
		expect(value)
			.toHaveProperty("created_at");
		expect(value)
			.toHaveProperty("updated_at");
	};

	const matchesUserProperties = (
		value: any,
		properties: object,
	) => {
		for (const [key, val] of Object.entries(properties)) {
			expect(value[key])
				.toEqual(val);
		}
	};

	const matchesPassword = async (
		value: any,
		password: string,
	) => {
		expect(await hash_service.compare(password, value.password))
			.toBeTruthy();
	};

	const matchesUserBasicProperties = async (value: any) => {
		matchesUserProperties(value, {
			name:  "Test user",
			email: "jd@example.com",
		});

		await matchesPassword(value, "password");
	};

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
		hash_service = module.get(HashService);

		const connection = module.get<Connection>(getConnectionToken(DATABASE_CONNECTIONS.default));
		await connection.dropDatabase();
	});

	it("can create user", async () => {
		const value = await service.create(user_basic_properties);

		hasUserProperties(value);
		await matchesUserBasicProperties(value);
	});

	it("cannot create user with existing email", async () => {
		await service.create(user_basic_properties);

		try {
			await service.create({
				...user_basic_properties,
				name: "test",
			});

			fail("Should not be able to create user with existing email");
		}
		catch (error: any) {
			expect(VerificationEmailSentErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can update user by id", async () => {
		const original_user = await service.create(user_basic_properties);

		const value = await service.update(
			original_user.id,
			{
				name: "test",
			},
		);

		hasUserProperties(value);
		matchesUserProperties(value, {
			name:  "test",
			email: user_basic_properties.email,
		});
		await matchesPassword(value, "password");

		expect(value.id)
			.toEqual(original_user.id);
	});

	it("can update user by instance", async () => {
		const original_user = await service.create(user_basic_properties);

		const value = await service.update(
			original_user,
			{
				name: "test",
			},
		);

		hasUserProperties(value);
		matchesUserProperties(value, {
			name:  "test",
			email: user_basic_properties.email,
		});
		await matchesPassword(value, "password");

		expect(value.id)
			.toEqual(original_user.id);
	});

	it("cannot update non existing user", async () => {
		try {
			await service.update(
				sample_id,
				{
					name: "test",
				},
			);

			fail("Should not be able to update non existing user");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("cannot update user email if email is unchanged", async () => {
		const original_user = await service.create(user_basic_properties);

		const value = await service.update(
			original_user,
			{
				email: user_basic_properties.email,
			},
		);

		expect(value)
			.toEqual(original_user);
	});

	it("can update user password", async () => {
		const original_user = await service.create(user_basic_properties);

		const value = await service.update(
			original_user,
			{
				password: "test",
			},
		);

		expect(await hash_service.compare("test", value.password))
			.toBeTruthy();
	});

	it("cannot update user email if email is already used", async () => {
		const original_user = await service.create(user_basic_properties);

		const email_placeholder = await service.create({
			name:     "u1",
			email:    "test@example.com",
			password: "password",
		});

		try {
			await service.update(
				original_user,
				{
					email: "test@example.com",
				},
			);

			fail("Should not be able to update user email if email is already used");
		}
		catch (error: any) {
			expect(VerificationEmailSentErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can delete user via document", async () => {
		const user = await service.create(user_basic_properties);

		const value = await service.delete(user);

		hasUserProperties(value);
		await matchesUserBasicProperties(value);

		expect(value.id)
			.toEqual(user.id);

		try {
			await service.find(user.id);

			fail("Should not be able to find deleted user");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can delete user via id", async () => {
		const user = await service.create(user_basic_properties);

		const value = await service.delete(user.id);

		hasUserProperties(value);
		await matchesUserBasicProperties(value);

		expect(value.id)
			.toEqual(user.id);

		try {
			await service.find(user.id);

			fail("Should not be able to find deleted user");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("cannot delete non existing user", async () => {
		try {
			await service.delete(sample_id);

			fail("Should not be able to delete non existing user");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can find user by id", async () => {
		const user = await service.create(user_basic_properties);

		const value = await service.find(user.id);

		hasUserProperties(value);
		await matchesUserBasicProperties(value);

		expect(value.id)
			.toEqual(user.id);
	});

	it("cannot find non existing user by id", async () => {
		try {
			await service.find(sample_id);

			fail("Should not be able to find non existing user");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can find user by email", async () => {
		const user = await service.create(user_basic_properties);

		const value = await service.findByEmail(user.email);

		hasUserProperties(value);
		await matchesUserBasicProperties(value);

		expect(value.id)
			.toEqual(user.id);
	});

	it("cannot find non existing user by email", async () => {
		try {
			await service.findByEmail(user_basic_properties.email);

			fail("Should not be able to find non existing user");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can find all users", async () => {
		const email1 = faker.internet.email(),
		      email2 = faker.internet.email();

		const user = await service.create(user_basic_properties);
		const user1 = await service.create({
			...user_basic_properties,
			email: email1,
		});
		const user2 = await service.create({
			...user_basic_properties,
			email: email2,
		});

		const value = await service.findAll();

		expect(value[0].email)
			.toEqual(user_basic_properties.email);
		expect(value[1].email)
			.toEqual(email1);
		expect(value[2].email)
			.toEqual(email2);
	});

	it("can find user by email and password", async () => {
		const user = await service.create(user_basic_properties);

		const value = await service.findByEmailAndPassword(user.email, "password");

		hasUserProperties(value);
		await matchesUserBasicProperties(value);

		expect(value.id)
			.toEqual(user.id);
	});

	it("cannot find user by wrong email and password", async () => {
		const user = await service.create(user_basic_properties);

		try {
			await service.findByEmailAndPassword(user.email, "test");

			fail("Should not be able to find user by wrong email and password");
		}
		catch (error: any) {
			expect(UserNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});
});
