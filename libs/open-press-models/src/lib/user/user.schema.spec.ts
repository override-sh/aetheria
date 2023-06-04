import { faker } from "@faker-js/faker";
import { User } from "./user.schema";
import { DateTime } from "luxon";
import { instanceToPlain } from "class-transformer";

describe("UserSchema", () => {
	it("can create partial user for validation", () => {
		const user = new User({
			name:       faker.person.fullName(),
			email:      faker.internet.email(),
			created_at: DateTime.now(),
			updated_at: DateTime.now(),
		});

		expect(user)
			.toBeDefined();
		expect(user.password)
			.toBeUndefined();

		const serialized = JSON.stringify(instanceToPlain(user));
		const unserialized = JSON.parse(serialized);
		expect(unserialized)
			.toEqual({
				name:  user.name,
				email: user.email,
			});
	});
});