import { Injectable } from "@nestjs/common";

@Injectable()
export class ExamplePluginService {
	public async exampleMethod(): Promise<{ example: string }> {
		return { example: "example-value" };
	}
}
