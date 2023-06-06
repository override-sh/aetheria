import { z } from "zod";
import { BadRequestException } from "@nestjs/common";
import { Constructor } from "@open-press/interfaces";
import { validate } from "./validate";

export const validateMany = <
	R,
	T extends z.ZodTypeAny = z.ZodTypeAny,
	E extends Constructor<Error> = Constructor<BadRequestException>
>(
	value: any[],
	schema: T[],
	error: E = BadRequestException as any,
): R => {
	if (value.length !== schema.length) {
		throw new error({
			form_errors:  [],
			field_errors: [
				{
					message: "The number of items in the array does not match the number of schemas.",
					code:    "invalid_array_length",
				},
			],
		});
	}

	return schema.map((
		schema,
		index,
	) => validate(value[index], schema, error)) as any;
};