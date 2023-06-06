import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import axios from "axios";
import { AppModule } from "../app.module";
import { Connection } from "mongoose";
import { getConnectionToken } from "@nestjs/mongoose";
import { DATABASE_CONNECTIONS } from "@override/backend-config";
import { UserService } from "@override/open-press-models";
import { faker } from "@faker-js/faker";

describe("AuthController", () => {
	let app: INestApplication,
	    local_strategy: LocalStrategy,
	    user_service: UserService,
	    url: string,
	    module: TestingModule,
	    connection: Connection;

	const makeUser = (
		email: string,
		password: string,
	) => {
		return user_service.create({
			email,
			password,
			name: faker.person.fullName(),
		});
	};

	beforeAll(async () => {
		module = await Test
			.createTestingModule({
				imports: [
					AppModule,
				],
			})
			.compile();

		local_strategy = module.get<LocalStrategy>(LocalStrategy);
		user_service = module.get<UserService>(UserService);

		app = module.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({
			forbidNonWhitelisted: true,
			forbidUnknownValues:  true,
			stopAtFirstError:     true,
			whitelist:            true,
			transform:            true,
		}));
		await app.listen(3000);
		url = await app.getUrl();
	});

	beforeEach(async () => {
		connection = module.get<Connection>(getConnectionToken(DATABASE_CONNECTIONS.default));
		await connection.dropDatabase();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should fire local strategy hooks when logging in", async () => {
		const unsubscribe = local_strategy.onBeforeValidation.subscribe(
			(caller) => {
				expect(caller)
					.toBe(local_strategy);
			},
		);

		await makeUser("test@example.com", "password");

		const res = await axios.post(`/auth/login`, {
			"email":    "test@example.com",
			"password": "password",
		}, {
			baseURL: url,
		});

		expect(res.status)
			.toBe(201);

		unsubscribe();
	});

	it("should return valid access token on login", async () => {
		await makeUser("test@example.com", "password");

		const res = await axios.post(`/auth/login`, {
			"email":    "test@example.com",
			"password": "password",
		}, {
			baseURL: url,
		});

		expect(res.status)
			.toBe(201);
		expect(res.data.access_token)
			.toBeDefined();
	});

	it("should be unauthorized with wrong credentials", async () => {
		try {
			await axios.post(`/auth/login`, {
				"email":    "test@example.com",
				"password": "password",
			}, {
				baseURL: url,
			});
		}
		catch (e: any) {
			expect(e.response.status)
				.toBe(401);
		}
	});

	it("should be able to get the user profile", async () => {
		await makeUser("test@example.com", "password");

		const login_response = await axios.post(`/auth/login`, {
			"email":    "test@example.com",
			"password": "password",
		}, {
			baseURL: url,
		});

		const res = await axios.get(`/auth/profile`, {
			baseURL: url,
			headers: {
				Authorization: `Bearer ${login_response.data.access_token}`,
			},
		});

		expect(res.status)
			.toBe(200);
		expect(res.data.id)
			.toBeDefined();
		expect(res.data.name)
			.toBeDefined();
		expect(res.data.email)
			.toBeDefined();

		expect(res.data.email)
			.toEqual("test@example.com");
	});
});