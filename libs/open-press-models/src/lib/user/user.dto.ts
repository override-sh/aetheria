import { Exclude } from "class-transformer";
import { DateTime } from "luxon";
import { MongoseId } from "@override/open-press-interfaces";
import { IsAscii, IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
	/**
	 * @description The name of the user.
	 * @type {string}
	 */
	@IsString()
	@IsAscii()
	@MinLength(3)
	@MaxLength(255)
	name!: string;

	/**
	 * @description The email of the user.
	 * @type {string}
	 */
	@IsEmail({
		domain_specific_validation: true,
	})
	email!: string;

	/**
	 * @description The password of the user.
	 * @type {string}
	 */
	@IsStrongPassword({
		minLength:    12,
		minNumbers:   1,
		minSymbols:   1,
		minUppercase: 1,
		minLowercase: 1,
	})
	password!: string;
}

export class UpdateUserDTO {
	/**
	 * @description The name of the user.
	 * @type {string}
	 */
	@IsString()
	@IsAscii()
	@MinLength(3)
	@MaxLength(255)
	name?: string;

	/**
	 * @description The email of the user.
	 * @type {string}
	 */
	@IsEmail({
		domain_specific_validation: true,
	})
	email?: string;

	/**
	 * @description The password of the user.
	 * @type {string}
	 */
	@IsStrongPassword({
		minLength:    12,
		minNumbers:   1,
		minSymbols:   1,
		minUppercase: 1,
		minLowercase: 1,
	})
	password?: string;
}

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