export interface CreateUserDTO {
	name: string;
	email: string;
	password: string;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;