import { Exclude } from "class-transformer";
import { DateTime } from "luxon";
import { MongoseId } from "@override/open-press-interfaces";
import { z } from "zod";

export const CreateTemplateDTOValidationSchema = z.object({
	/**
	 * @description The name of the template.
	 */
	name: z.string()
	       .min(3),

	/**
	 * @description The HTML of the template.
	 */
	html: z.string(),

	/**
	 * @description The CSS of the template.
	 */
	css: z.string(),
});
export type CreateTemplateDTO = z.infer<typeof CreateTemplateDTOValidationSchema>;

export const UpdateTemplateDTOValidationSchema = CreateTemplateDTOValidationSchema.partial();
export type UpdateTemplateDTO = z.infer<typeof UpdateTemplateDTOValidationSchema>;

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