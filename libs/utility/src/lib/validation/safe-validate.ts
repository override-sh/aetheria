import { SafeParseReturnType, z, ZodType } from "zod";

export const safeValidate = <
	R,
	T extends z.ZodTypeAny = z.ZodTypeAny,
>(
	value: any,
	schema: T,
): SafeParseReturnType<any, R> => {
	return (schema as ZodType<R, any, any>).safeParse(value);
};