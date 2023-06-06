import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { TemplateService, UserService } from "@override/open-press-models";
import { Connection } from "mongoose";
import { faker } from "@faker-js/faker";
import { AppModule } from "../app.module";
import { getConnectionToken } from "@nestjs/mongoose";
import { DATABASE_CONNECTIONS } from "@override/backend-config";
import axios from "axios";

describe("TemplateController", () => {
	let app: INestApplication,
	    user_service: UserService,
	    template_service: TemplateService,
	    url: string,
	    module: TestingModule,
	    connection: Connection;

	const getValidJwt = async (): Promise<string> => {
		await user_service.create({
			email:    "test@example.com",
			password: "password",
			name:     faker.person.fullName(),
		});

		const res = await axios.post(`/auth/login`, {
			"email":    "test@example.com",
			"password": "password",
		}, {
			baseURL: url,
		});

		return res.data.access_token;
	};

	beforeAll(async () => {
		module = await Test
			.createTestingModule({
				imports: [
					AppModule,
				],
			})
			.compile();

		user_service = module.get<UserService>(UserService);
		template_service = module.get<TemplateService>(TemplateService);

		app = module.createNestApplication();
		await app.listen(3001);
		url = await app.getUrl();
	});

	beforeEach(async () => {
		connection = module.get<Connection>(getConnectionToken(DATABASE_CONNECTIONS.default));
		await connection.dropDatabase();
	});

	afterAll(async () => {
		await app.close();
	});

	it("cannot create invalid template", async () => {
		const access_token = await getValidJwt();

		try {
			await axios.post(`/template/`, {
				"email":    "test@example.com",
				"password": "password",
			}, {
				baseURL: url,
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
		}
		catch (e: any) {
			expect(e.response.status)
				.toBe(400);
			expect(e.response.data.field_errors)
				.toEqual({
					name: [
						{
							message: "Required",
							code:    "invalid_type",
						},
					],
					css:  [
						{
							message: "Required",
							code:    "invalid_type",
						},
					],
					html: [
						{
							message: "Required",
							code:    "invalid_type",
						},
					],
				});
		}
	});

	it("can create template", async () => {
		const access_token = await getValidJwt();

		const response = await axios.post(`/template/`, {
			name: "test",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		}, {
			baseURL: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		expect(response.status)
			.toBe(201);
		expect(response.data.name)
			.toEqual("test");
		expect(response.data.html)
			.toEqual("<h1>Test</h1>");
		expect(response.data.css)
			.toEqual("h1 { color: red; }");
		expect(response.data.id)
			.toBeDefined();
	});

	it("can update template", async () => {
		const access_token = await getValidJwt();

		const template = await template_service.create({
			name: "test",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		});

		const response = await axios.put(`/template/${template.id}`, {
			name: "new-name",
		}, {
			baseURL: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		expect(response.status)
			.toBe(200);
		expect(response.data.name)
			.toEqual("new-name");
		expect(response.data.html)
			.toEqual("<h1>Test</h1>");
		expect(response.data.css)
			.toEqual("h1 { color: red; }");
		expect(response.data.id)
			.toEqual(template.id);
	});

	it("cannot update invalid template", async () => {
		const access_token = await getValidJwt();

		try {
			await axios.put(`/template/this-is-invalid`, {
				name: "new-name",
			}, {
				baseURL: url,
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
		}
		catch (e: any) {
			expect(e.response.status)
				.toBe(400);
			expect(e.response.data.field_errors)
				.toEqual({});
			expect(e.response.data.form_errors)
				.toEqual([
					{
						message: "Invalid identifier.",
						code:    "custom",
					},
				]);
		}
	});

	it("can delete template", async () => {
		const access_token = await getValidJwt();

		const template = await template_service.create({
			name: "test",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		});

		const response = await axios.delete(`/template/${template.id}`, {
			baseURL: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		expect(response.status)
			.toBe(200);
		expect(response.data.name)
			.toEqual("test");
		expect(response.data.html)
			.toEqual("<h1>Test</h1>");
		expect(response.data.css)
			.toEqual("h1 { color: red; }");
		expect(response.data.id)
			.toEqual(template.id);
	});

	it("cannot delete invalid template", async () => {
		const access_token = await getValidJwt();

		try {
			await axios.delete(`/template/this-is-invalid`, {
				baseURL: url,
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
		}
		catch (e: any) {
			expect(e.response.status)
				.toBe(400);
			expect(e.response.data.field_errors)
				.toEqual({});
			expect(e.response.data.form_errors)
				.toEqual([
					{
						message: "Invalid identifier.",
						code:    "custom",
					},
				]);
		}
	});

	it("can get template", async () => {
		const access_token = await getValidJwt();

		const template = await template_service.create({
			name: "test",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		});

		const response = await axios.get(`/template/${template.id}`, {
			baseURL: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		expect(response.status)
			.toBe(200);
		expect(response.data.name)
			.toEqual("test");
		expect(response.data.html)
			.toEqual("<h1>Test</h1>");
		expect(response.data.css)
			.toEqual("h1 { color: red; }");
		expect(response.data.id)
			.toEqual(template.id);
	});

	it("cannot get invalid template", async () => {
		const access_token = await getValidJwt();

		try {
			await axios.get(`/template/this-is-invalid`, {
				baseURL: url,
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
		}
		catch (e: any) {
			expect(e.response.status)
				.toBe(400);
			expect(e.response.data.field_errors)
				.toEqual({});
			expect(e.response.data.form_errors)
				.toEqual([
					{
						message: "Invalid identifier.",
						code:    "custom",
					},
				]);
		}
	});

	it("can list templates", async () => {
		const access_token = await getValidJwt();

		const template0 = await template_service.create({
			name: "test",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		});
		const template1 = await template_service.create({
			name: "test1",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		});
		const template2 = await template_service.create({
			name: "test2",
			html: "<h1>Test</h1>",
			css:  "h1 { color: red; }",
		});

		const response = await axios.get(`/template/`, {
			baseURL: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		expect(response.status)
			.toBe(200);
		expect(response.data.length)
			.toBe(3);
		expect(response.data[0].name)
			.toEqual(template0.name);
		expect(response.data[1].name)
			.toEqual(template1.name);
		expect(response.data[2].name)
			.toEqual(template2.name);
	});
});
