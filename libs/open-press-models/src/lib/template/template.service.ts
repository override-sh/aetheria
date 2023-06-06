import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTIONS } from "@open-press/backend-config";
import { Template, TemplateDocument, TemplateModel } from "./template.schema";
import { CreateTemplateDTO, UpdateTemplateDTO } from "./template.dto";
import { TemplateNameAlreadyUsedErrorFactory, TemplateNotFoundErrorFactory } from "./errors";
import { DateTime } from "luxon";

@Injectable()
export class TemplateService {
	constructor(
		@InjectModel(Template.name, DATABASE_CONNECTIONS.default) private readonly model: TemplateModel,
	) {}

	/**
	 * Create a new template.
	 * @param {CreateTemplateDTO} template - Template to create.
	 * @returns {Promise<TemplateDocument>} - Created template.
	 */
	public async create(template: CreateTemplateDTO): Promise<TemplateDocument> {
		if (await this.exists(template.name)) {
			throw TemplateNameAlreadyUsedErrorFactory.make();
		}

		const document = new this.model(template);

		document.created_at = document.updated_at = DateTime.now();

		return document.save();
	}

	/**
	 * Update a template.
	 * @param {string | TemplateDocument} template - Template to update.
	 * @param {UpdateTemplateDTO} update - Update to apply.
	 * @returns {Promise<TemplateDocument>} - Updated template.
	 */
	public async update(
		template: string | TemplateDocument,
		update: UpdateTemplateDTO,
	): Promise<TemplateDocument> {
		// if the template is a string, we need to find it
		// internally handled the case the template id is invalid
		if (this.isTemplateIdentifier(template)) {
			template = await this.find(template);
		}

		// if the update has a name and it's not the same as the template's name, check if it exists
		if (update.name && template.name !== update.name && await this.exists(update.name)) {
			throw TemplateNameAlreadyUsedErrorFactory.make();
		}

		template.$set(update);
		template.updated_at = DateTime.now();

		return template.save();
	}

	/**
	 * Delete a template.
	 * @param {string | TemplateDocument} template - Template to delete.
	 * @returns {Promise<TemplateDocument>} - Deleted template.
	 */
	public async delete(template: string | TemplateDocument): Promise<TemplateDocument> {
		// if the template is a string, we need to find it
		// internally handled the case the template id is invalid
		if (this.isTemplateIdentifier(template)) {
			template = await this.find(template);
		}

		return template.deleteOne();
	}

	/**
	 * Find a template by its name.
	 * @param {string} name - Template name to find.
	 * @returns {Promise<TemplateDocument>} - Found template.
	 */
	public async findByName(name: string): Promise<TemplateDocument> {
		const document = await this.model.findOne({ name });

		if (document) {
			return document;
		}

		throw TemplateNotFoundErrorFactory.make();
	}

	/**
	 * Find all templates.
	 * @returns {Promise<TemplateDocument[]>} - Found templates.
	 */
	public async findAll(): Promise<TemplateDocument[]> {
		return this.model.find();
	}

	/**
	 * Find a template by its id.
	 * @param {string} template - Template id to find.
	 * @returns {Promise<TemplateDocument>} - Found template.
	 */
	public async find(template: string): Promise<TemplateDocument> {
		const document = await this.model.findById(template);

		if (document) {
			return document;
		}

		throw TemplateNotFoundErrorFactory.make();
	}

	/**
	 * Check if a template name is already used.
	 * @param {string} name - Template name to check.
	 * @returns {Promise<boolean>} - True if the template name is already used, false otherwise.
	 * @private
	 */
	private async exists(name: string): Promise<boolean> {
		return await this.model.exists({ name }) !== null;
	}

	/**
	 * Check if a template is a string.
	 * @param {string | TemplateDocument | null} template - Template to check.
	 * @returns {template is string} - True if the template is a string, false otherwise.
	 * @private
	 */
	private isTemplateIdentifier(template: string | TemplateDocument | null): template is string {
		return typeof template === "string";
	}
}
