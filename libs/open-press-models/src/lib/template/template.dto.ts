import { Exclude } from "class-transformer";
import { DateTime } from "luxon";
import { MongoseId } from "@override/open-press-interfaces";

export interface CreateTemplateDTO {
	name: string;
	html: string;
	css: string;
}

export type UpdateTemplateDTO = Partial<CreateTemplateDTO>;

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