import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument, UserModel } from "./user.schema";
import { DATABASE_CONNECTIONS } from "@override/backend-config";
import { DateTime } from "luxon";
import { HashService } from "@override/open-press-support";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { UserNotFoundError, VerificationEmailSentError } from "./errors";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name, DATABASE_CONNECTIONS.default) private readonly model: UserModel,
		private readonly hash_service: HashService,
	) {}

	/**
	 * @description This method will create a new user in the database.
	 * @param {CreateUserDTO} user The user to create.
	 * @returns {Promise<User>} The created user.
	 */
	public async create(user: CreateUserDTO) {
		const created_user = new this.model(user);

		if (await this.emailExists(user.email)) {
			throw VerificationEmailSentError.make();
		}

		created_user.created_at = created_user.updated_at = DateTime.now();
		created_user.password = await this.hash_service.make(user.password);

		return await created_user.save();
	}

	/**
	 * @description This method will find a user by their id or object and update it.
	 * @param {string | UserModel | null} user The user to find.
	 * @param {UpdateUserDTO} update The update to apply.
	 * @returns {Promise<User>} The updated user.
	 */
	public async update(
		user: string | UserModel | null,
		update: UpdateUserDTO,
	): Promise<User> {
		// if the user is a string, we need to find it
		if (this.isUserIdentifier(user)) {
			user = await this.model.findById(user);
		}

		// if the user is null, fail fast
		if (!this.isUser(user)) {
			throw UserNotFoundError.make();
		}

		// if the update has an email and it's not the same as the user's email, check if it exists
		if (update.email && update.email !== user.email && await this.emailExists(update.email)) {
			throw VerificationEmailSentError.make();
		}

		// if the update has a password, hash it
		if (update.password) {
			update.password = await this.hash_service.make(update.password);
		}

		return user.updateOne({
			...update,
			updated_at: DateTime.now(),
		});
	}

	/**
	 * @description This method will find a user by their id or object and delete it.
	 * @param {string | UserModel | null} user The user to find.
	 * @returns {Promise<User>} The deleted user.
	 */
	public async delete(user: string | UserModel | null): Promise<User> {
		// if the user is a string, we need to find it
		if (this.isUserIdentifier(user)) {
			user = await this.model.findById(user);
		}

		// if the user is null, fail fast
		if (!this.isUser(user)) {
			throw UserNotFoundError.make();
		}

		return user.deleteOne();
	}

	/**
	 * @description This method will find a user by their id and return it.
	 * @param {string} id The id of the user to find.
	 * @returns {Promise<User | null>} The found user.
	 */
	public async find(id: string): Promise<User | null> {
		return this.model.findById(id);
	}

	/**
	 * @description This method will find a user by their email and return it.
	 * @param {string} email The email of the user to find.
	 * @returns {Promise<User>} The found user.
	 */
	public async findByEmail(email: string): Promise<User> {
		const user = await this.model.findOne({ email });

		if (user) {
			return user;
		}

		throw UserNotFoundError.make();
	}

	/**
	 * @description This method will find all users and return them.
	 * @returns {Promise<User[]>} The found users.
	 */
	public async findAll(): Promise<User[]> {
		return this.model.find();
	}

	/**
	 * @description This method will find a user by their email and password and return it.
	 * @param {string} email The email of the user to find.
	 * @param {string} password The password of the user to find.
	 * @returns {Promise<User>} The found user.
	 */
	public async findByEmailAndPassword(
		email: string,
		password: string,
	): Promise<User> {
		const user = await this.findByEmail(email);

		if (await this.hash_service.compare(password, user.password)) {
			return user;
		}

		throw UserNotFoundError.make();
	}

	/**
	 * @description This method will check if the user is a user model.
	 * @param {string | UserModel | null} user The user to check.
	 * @returns {user is UserModel} Whether the user is a user model.
	 * @private
	 */
	private isUser(user: string | UserModel | UserDocument | null): user is UserDocument {
		return user instanceof this.model;
	}

	/**
	 * @description This method will check if the user is a user identifier.
	 * @param {string | UserModel | UserDocument | null} user The user to check.
	 * @returns {user is string} Whether the user is a user identifier.
	 * @private
	 */
	private isUserIdentifier(user: string | UserModel | UserDocument | null): user is string {
		return typeof user === "string";
	}

	/**
	 * @description This method will check if the user email exists in the database.
	 * @param {string} email The email to check.
	 * @returns {Promise<boolean>} Whether the email exists.
	 * @private
	 */
	private async emailExists(email: string): Promise<boolean> {
		return await this.model.exists({ email }) !== null;
	}
}
