import { Test, TestingModule } from "@nestjs/testing";
import { TemplateService } from "./template.service";
import { ConfigModule } from "@nestjs/config";
import {
	authConfig,
	DATABASE_CONFIG_KEY,
	DATABASE_CONNECTIONS,
	DatabaseConfig,
	databaseConfig,
	EnvValidation,
} from "@override/backend-config";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { Template, TemplateSchema } from "./template.schema";
import { Connection } from "mongoose";
import { TemplateNameAlreadyUsedErrorFactory, TemplateNotFoundErrorFactory } from "./errors";

const sample_id = "507f191e810c19729de860ea";
const template_basic_properties = {
	name: "test",
	html: "<h1>test</h1>",
	css:  "h1 { color: red; }",
};

describe("TemplateService", () => {
	let service: TemplateService;

	const hasTemplateProperties = (value: any) => {
		expect(value)
			.toHaveProperty("_id");
		expect(value)
			.toHaveProperty("name");
		expect(value)
			.toHaveProperty("html");
		expect(value)
			.toHaveProperty("css");
		expect(value)
			.toHaveProperty("created_at");
		expect(value)
			.toHaveProperty("updated_at");
	};

	const matchesTemplateProperties = (
		value: any,
		properties: object,
	) => {
		for (const [key, val] of Object.entries(properties)) {
			expect(value[key])
				.toEqual(val);
		}
	};

	const matchesTemplateBasicProperties = (value: any) => {
		matchesTemplateProperties(value, template_basic_properties);
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
							name:   Template.name,
							schema: TemplateSchema,
						},
					],
					DATABASE_CONNECTIONS.default,
				),
			],
			providers: [
				TemplateService,
			],
		})
		                                        .compile();

		service = module.get<TemplateService>(TemplateService);

		const connection = module.get<Connection>(getConnectionToken(DATABASE_CONNECTIONS.default));
		await connection.dropDatabase();
	});

	it("can create template", async () => {
		const doc = await service.create(template_basic_properties);

		hasTemplateProperties(doc);
		matchesTemplateBasicProperties(doc);
	});

	it("cannot create template with existing name", async () => {
		const doc = await service.create(template_basic_properties);

		try {
			await service.create(template_basic_properties);

			fail("should not have created template with existing name");
		}
		catch (error: any) {
			expect(TemplateNameAlreadyUsedErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can update template by instance", async () => {
		const doc = await service.create(template_basic_properties);

		const updated_doc = await service.update(doc, {
			name: "test2",
		});

		hasTemplateProperties(updated_doc);
		matchesTemplateProperties(updated_doc, {
			...template_basic_properties,
			name: "test2",
		});

		expect(updated_doc.id)
			.toEqual(doc.id);
	});

	it("can update template by id", async () => {
		const doc = await service.create(template_basic_properties);

		const updated_doc = await service.update(doc.id, {
			name: "test2",
		});

		hasTemplateProperties(updated_doc);
		matchesTemplateProperties(updated_doc, {
			...template_basic_properties,
			name: "test2",
		});

		expect(updated_doc.id)
			.toEqual(doc.id);
	});

	it("cannot update non existing template", async () => {
		try {
			await service.update(sample_id, {
				name: "test2",
			});

			fail("should not have updated non existing template");
		}
		catch (error: any) {
			expect(TemplateNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("cannot update template name if name is unchanged", async () => {
		const doc = await service.create(template_basic_properties);

		const updated_doc = await service.update(doc.id, {
			html: "<h1>test2</h1>",
		});

		hasTemplateProperties(updated_doc);
		matchesTemplateProperties(updated_doc, {
			...template_basic_properties,
			html: "<h1>test2</h1>",
		});

		expect(updated_doc.name)
			.toEqual(doc.name);
	});

	it("cannot update template name if name is already used", async () => {
		const doc = await service.create(template_basic_properties);
		await service.create({
			...template_basic_properties,
			name: "test2",
		});

		try {
			await service.update(doc, {
				name: "test2",
			});

			fail("should not have updated template name if name is already used");
		}
		catch (error: any) {
			expect(TemplateNameAlreadyUsedErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can delete template by instance", async () => {
		const doc = await service.create(template_basic_properties);

		const deleted_doc = await service.delete(doc);

		hasTemplateProperties(deleted_doc);
		matchesTemplateBasicProperties(deleted_doc);

		expect(deleted_doc.id)
			.toEqual(doc.id);

		try {
			await service.find(deleted_doc.id);

			fail("should not have found deleted template");
		}
		catch (error: any) {
			expect(TemplateNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can delete template by id", async () => {
		const doc = await service.create(template_basic_properties);

		const deleted_doc = await service.delete(doc.id);

		hasTemplateProperties(deleted_doc);
		matchesTemplateBasicProperties(deleted_doc);

		expect(deleted_doc.id)
			.toEqual(doc.id);

		try {
			await service.find(deleted_doc.id);

			fail("should not have found deleted template");
		}
		catch (error: any) {
			expect(TemplateNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("cannot delete non existing template", async () => {
		try {
			await service.delete(sample_id);

			fail("should not have deleted non existing template");
		}
		catch (error: any) {
			expect(TemplateNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can find template by name", async () => {
		const doc = await service.create(template_basic_properties);

		const found_doc = await service.findByName(doc.name);

		hasTemplateProperties(found_doc);
		matchesTemplateBasicProperties(found_doc);

		expect(found_doc.id)
			.toEqual(doc.id);
	});

	it("cannot find template by non existing name", async () => {
		try {
			await service.findByName("non-existing");

			fail("should not have found non existing template");
		}
		catch (error: any) {
			expect(TemplateNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can find template by id", async () => {
		const doc = await service.create(template_basic_properties);

		const found_doc = await service.find(doc.id);

		hasTemplateProperties(found_doc);
		matchesTemplateBasicProperties(found_doc);

		expect(found_doc.id)
			.toEqual(doc.id);
	});

	it("cannot find template by non existing id", async () => {
		try {
			await service.find(sample_id);

			fail("should not have found non existing template");
		}
		catch (error: any) {
			expect(TemplateNotFoundErrorFactory.is(error))
				.toBeTruthy();
		}
	});

	it("can find all templates", async () => {
		const doc = await service.create(template_basic_properties);
		const doc_1 = await service.create({
			...template_basic_properties,
			name: "test2",
		});
		const doc_2 = await service.create({
			...template_basic_properties,
			name: "test3",
		});

		const docs = await service.findAll();

		expect(docs[0].name)
			.toEqual(template_basic_properties.name);
		expect(docs[1].name)
			.toEqual("test2");
		expect(docs[2].name)
			.toEqual("test3");
	});
});
