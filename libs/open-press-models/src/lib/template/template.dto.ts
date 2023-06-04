export interface CreateTemplateDTO {
	name: string;
	html: string;
	css: string;
}

export type UpdateTemplateDTO = Partial<CreateTemplateDTO>;