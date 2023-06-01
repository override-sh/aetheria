import { ClassSerializerInterceptor, Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import {
	authConfig,
	DATABASE_CONFIG_KEY,
	DATABASE_CONNECTIONS,
	databaseConfig,
	DatabaseConfig,
	EnvValidation,
} from "@override/backend-config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
	imports:     [
		ConfigModule.forRoot({
			isGlobal:        true,
			cache:           true,
			expandVariables: true,
			load:            [
				databaseConfig,
				authConfig,
			],
			validate:        (config: Record<string, any>) => EnvValidation.instance.validateEnv(config),
		}),
		MongooseModule.forRootAsync({
			inject:         [DATABASE_CONFIG_KEY],
			useFactory:     async (db_config: DatabaseConfig): Promise<MongooseModuleFactoryOptions> => {
				return {
					dbName: db_config[DATABASE_CONNECTIONS.default].database,
					uri:    `mongodb://` +
					        `${db_config[DATABASE_CONNECTIONS.default].username}:` +
					        `${db_config[DATABASE_CONNECTIONS.default].password}@` +
					        `${db_config[DATABASE_CONNECTIONS.default].host}:` +
					        `${db_config[DATABASE_CONNECTIONS.default].port}/`,
				};
			},
			connectionName: DATABASE_CONNECTIONS.default,
		}),
	],
	controllers: [AppController],
	providers:   [
		AppService,
		{
			provide:  APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule {
}
