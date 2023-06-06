import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {
	CreateTemplateDTO,
	CreateTemplateDTOValidationSchema,
	TemplateEntity,
	TemplateService,
	UpdateTemplateDTO,
	UpdateTemplateDTOValidationSchema,
} from "@override/open-press-models";
import { NonUniformEventList } from "strongly-typed-events";
import { TemplateControllerEvents } from "./types";
import { TEMPLATE_CONTROLLER_EVENTS } from "./constants";
import { validate, validateMany } from "@override/utility/server";
import { MongoIdSchema } from "../../../../../libs/utility/src/lib/validation/common-schemas";

@Controller("template")
export class TemplateController {
	private _events = new NonUniformEventList<TemplateController, TemplateControllerEvents>();

	constructor(
		private readonly _template_service: TemplateService,
	) {}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.creation_before event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.creation.before"]>}
	 */
	get onBeforeCreation() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.creation_before)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.creation_after event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.creation.after"]>}
	 */
	get onAfterCreation() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.creation_after)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.update_before event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.update.before"]>}
	 */
	get onBeforeUpdate() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.update_before)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.update_after event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.update.after"]>}
	 */
	get onAfterUpdate() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.update_after)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.delete_before event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.delete.before"]>}
	 */
	get onBeforeDelete() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.delete_before)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.delete_after event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.delete.after"]>}
	 */
	get onAfterDelete() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.delete_after)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.list_before event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.list.before"]>}
	 */
	get onBeforeList() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.list_before)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.list_after event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.list.after"]>}
	 */
	get onAfterList() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.list_after)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.get_before event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.get.before"]>}
	 */
	get onBeforeGet() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.get_before)
		           .asEvent();
	}

	/**
	 * @description This method allows for the listening of the TEMPLATE_CONTROLLER_EVENTS.get_after event.
	 * @returns {IEvent<TemplateController, TemplateControllerEvents["hook.template.get.after"]>}
	 */
	get onAfterGet() {
		/* istanbul ignore next */
		return this._events.get(TEMPLATE_CONTROLLER_EVENTS.get_after)
		           .asEvent();
	}

	/**
	 * This method is used to create a new template.
	 * @param {CreateTemplateDTO} template - The template to create.
	 * @returns {Promise<TemplateEntity>} - The created template.
	 */
	@Post()
	async create(@Body() template: CreateTemplateDTO) {
		template = validate<CreateTemplateDTO>(template, CreateTemplateDTOValidationSchema);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.creation_before)
		    .dispatch(this, { template });

		const document = await this._template_service.create(template);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.creation_after)
		    .dispatch(this, { document });

		return new TemplateEntity(document);
	}

	/**
	 * This method is used to update a template.
	 * @param {string} template_id - The id of the template to update.
	 * @param {UpdateTemplateDTO} template - The template to update.
	 * @returns {Promise<TemplateEntity>} - The updated template.
	 */
	@Put(":id")
	async update(
		@Param("id") template_id: string,
		@Body() template: UpdateTemplateDTO,
	) {
		[
			template_id,
			template,
		] = validateMany<[string, UpdateTemplateDTO]>(
			[
				template_id,
				template,
			],
			[
				MongoIdSchema,
				UpdateTemplateDTOValidationSchema,
			],
		);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.update_before)
		    .dispatch(
			    this,
			    {
				    template_id,
				    template,
			    },
		    );

		const document = await this._template_service.update(template_id, template);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.update_after)
		    .dispatch(this, { document });

		return new TemplateEntity(document);
	}

	/**
	 * This method is used to delete a template.
	 * @param {string} template_id - The id of the template to delete.
	 * @returns {Promise<TemplateEntity>} - The deleted template.
	 */
	@Delete(":id")
	async delete(@Param("id") template_id: string) {
		template_id = validate<string>(template_id, MongoIdSchema);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.delete_before)
		    .dispatch(this, { template_id });

		const document = await this._template_service.delete(template_id);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.delete_after)
		    .dispatch(this, { document });

		return new TemplateEntity(document);
	}

	/**
	 * This method is used to get a template.
	 * @param {string} template_id - The id of the template to get.
	 * @returns {Promise<TemplateEntity>} - The template.
	 */
	@Get(":id")
	async get(@Param("id") template_id: string) {
		template_id = validate<string>(template_id, MongoIdSchema);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.get_before)
		    .dispatch(this, { template_id });

		const document = await this._template_service.find(template_id);

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.get_after)
		    .dispatch(this, { document });

		return new TemplateEntity(document);
	}

	/**
	 * This method is used to list all templates.
	 * @returns {Promise<TemplateEntity[]>} - The templates.
	 */
	@Get()
	async list() {
		this._events.get(TEMPLATE_CONTROLLER_EVENTS.list_before)
		    .dispatch(this, {});

		const documents = await this._template_service.findAll();

		this._events.get(TEMPLATE_CONTROLLER_EVENTS.list_after)
		    .dispatch(this, { documents });

		return (documents).map(template => new TemplateEntity(template));
	}
}
