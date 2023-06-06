import { Exclude } from "class-transformer";
import { DateTime } from "luxon";
import { MongoseId } from "@override/open-press-interfaces";
import { z } from "zod";

export const CreateUserDTOValidationSchema = z.object({
	/**
	 * @description The name of the user.
	 */
	name: z.string()
	       .min(3)
	       .max(255),

	/**
	 * @description The email of the user.
	 */
	email: z.string()
	        .email(),

	/**
	 * @description The password of the user.
	 */
	password: z.string()
	           .min(12),
});
export type CreateUserDTO = z.infer<typeof CreateUserDTOValidationSchema>;

export const UpdateUserDTOValidationSchema = CreateUserDTOValidationSchema.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserDTOValidationSchema>;

export class UserEntity {
	id!: string;
	name!: string;
	email!: string;

	@Exclude()
	password!: string;

	@Exclude()
	created_at!: DateTime;

	@Exclude()
	updated_at!: DateTime;

	constructor(user: Partial<UserEntity & MongoseId>) {
		Object.assign(this, {
			id:         user._id?.toHexString(),
			name:       user.name,
			email:      user.email,
			password:   user.password,
			created_at: user.created_at,
			updated_at: user.updated_at,
		});
	}
}