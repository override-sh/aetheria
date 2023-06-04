import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * This decorator is used to extract the user from the request object.
 * @type {(...dataOrPipes: Type<PipeTransform> | PipeTransform[]) => ParameterDecorator}
 * @returns {UserDocument} The user document.
 */
export const RestUser = createParamDecorator(
	(
		data: never,
		ctx: ExecutionContext,
	) => {
		return ctx.switchToHttp()
		          .getRequest().user;
	},
);
