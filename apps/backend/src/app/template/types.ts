import { TEMPLATE_CONTROLLER_EVENTS } from "./constants";
import { CreateTemplateDTO, TemplateDocument, UpdateTemplateDTO } from "@override/open-press-models";

/**
 * @description This type contains the event names and their payloads that are emitted by the TemplateController.
 */
export type TemplateControllerEvents = {
	[TEMPLATE_CONTROLLER_EVENTS.creation_before]: {
		template: CreateTemplateDTO
	}
	[TEMPLATE_CONTROLLER_EVENTS.creation_after]: {
		document: TemplateDocument
	}
	[TEMPLATE_CONTROLLER_EVENTS.update_before]: {
		template_id: string,
		template: UpdateTemplateDTO,
	}
	[TEMPLATE_CONTROLLER_EVENTS.update_after]: {
		document: TemplateDocument
	}
	[TEMPLATE_CONTROLLER_EVENTS.delete_before]: {
		template_id: string,
	}
	[TEMPLATE_CONTROLLER_EVENTS.delete_after]: {
		document: TemplateDocument
	}
	[TEMPLATE_CONTROLLER_EVENTS.list_before]: Record<string, never>
	[TEMPLATE_CONTROLLER_EVENTS.list_after]: {
		documents: TemplateDocument[]
	}
	[TEMPLATE_CONTROLLER_EVENTS.get_before]: {
		template_id: string,
	}
	[TEMPLATE_CONTROLLER_EVENTS.get_after]: {
		document: TemplateDocument
	}
}