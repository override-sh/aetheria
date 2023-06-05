import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({
		forbidNonWhitelisted: true,
		forbidUnknownValues:  true,
		stopAtFirstError:     true,
		whitelist:            true,
		transform:            true,
	}));

	const port = process.env.PORT || 3000;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
