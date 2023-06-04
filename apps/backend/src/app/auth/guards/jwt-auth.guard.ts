import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IS_PUBLIC_ENDPOINT_KEY } from "@override/open-press-support";

@Injectable()
export class JwtAuthGuard
	extends AuthGuard("jwt") {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const is_public = this.reflector.get<boolean>(IS_PUBLIC_ENDPOINT_KEY, context.getHandler());
		if (is_public) {
			return true;
		}

		return super.canActivate(context);
	}
}