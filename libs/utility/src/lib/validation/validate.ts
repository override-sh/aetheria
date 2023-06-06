import { z, ZodError } from "zod";
import { BadRequestException } from "@nestjs/common";
import { Constructor } from "@open-press/interfaces";

export const validate = <
	R,
	T extends z.ZodTypeAny = z.ZodTypeAny,
	E extends Constructor<Error> = Constructor<BadRequestException>
>(
	value: any,
	schema: T,
	error: E = BadRequestException as any,
): R => {
	try {
		return schema.parse(value);
	}
	catch (e: unknown) {
		if (e instanceof ZodError) {
			const errors = e.flatten((issue) => ({
				message: issue.message,
				code:    issue.code,
			}));

			throw new error({
				form_errors:  errors.formErrors,
				field_errors: errors.fieldErrors,
			});
		}

		throw e;
	}
};