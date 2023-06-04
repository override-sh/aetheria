import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { DateTime } from "luxon";

@Schema()
export class Template {
	@Prop({
		required: true,
		unique:   true,
	})
	name!: string;

	@Prop({
		required: true,
	})
	html!: string;

	@Prop({
		required: true,
	})
	css!: string;

	/**
	 * Template's creation date - autofilled when using TemplateService.
	 * @type {DateTime}
	 */
	@Prop({
		required: true,
		default:  DateTime.now(),
		type:     DateTime,
	})
	created_at!: DateTime;

	/**
	 * Template's last update date - autofilled when using TemplateService.
	 * @type {DateTime}
	 */
	@Prop({
		required: true,
		default:  DateTime.now(),
		type:     DateTime,
	})
	updated_at!: DateTime;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);

/**
 * Type for a hydrated Template document, returned in queries.
 */
export type TemplateDocument = HydratedDocument<Template>;

/**
 * Type for a template mongoose model, this type is not returned in query - you should use TemplateDocument instead.
 */
export type TemplateModel = Model<Template>