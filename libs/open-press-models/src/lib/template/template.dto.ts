import { Exclude } from "class-transformer";
import { DateTime } from "luxon";
import { MongoseId } from "@override/open-press-interfaces";
import { IsAscii, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTemplateDTO {
	/**
	 * @description The name of the template.
	 * @type {string}
	 */
	@IsString()
	@IsAscii()
	@MinLength(3)
	name!: string;

	/**
	 * @description The HTML of the template.
	 * @type {string}
	 */
	@IsString()
	html!: string;

	/**
	 * @description The CSS of the template.
	 * @type {string}
	 */
	@IsString()
	css!: string;
}

export class UpdateTemplateDTO {
	/**
	 * @description The name of the template.
	 * @type {string}
	 */
	@IsString()
	@IsAscii()
	@MinLength(3)
	@IsOptional()
	name?: string;

	/**
	 * @description The HTML of the template.
	 * @type {string}
	 */
	@IsString()
	@IsOptional()
	html?: string;

	/**
	 * @description The CSS of the template.
	 * @type {string}
	 */
	@IsString()
	@IsOptional()
	css?: string;
}

export class TemplateEntity {
	id!: string;
	name!: string;
	html!: string;
	css!: string;

	@Exclude()
	created_at!: DateTime;

	@Exclude()
	updated_at!: DateTime;

	constructor(template: Partial<TemplateEntity & MongoseId>) {
		Object.assign(this, {
			id:         template._id?.toHexString(),
			name:       template.name,
			html:       template.html,
			css:        template.css,
			created_at: template.created_at,
			updated_at: template.updated_at,
		});
	}
}