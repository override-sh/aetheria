import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { DateTime } from "luxon";
import { Exclude } from "class-transformer";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({
		required:  true,
		maxlength: 255,
	})
	name!: string;
	@Prop({
		required:  true,
		maxlength: 255,
		unique:    true,
	})
	email!: string;
	@Prop({ required: true })
	@Exclude()
	password!: string;
	@Prop({
		required: true,
		default:  DateTime.now(),
		type:     DateTime,
	})
	@Exclude()
	created_at!: DateTime;
	@Prop({
		required: true,
		default:  DateTime.now(),
		type:     DateTime,
	})
	@Exclude()
	updated_at!: DateTime;

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>