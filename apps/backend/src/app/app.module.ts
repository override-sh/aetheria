import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
	authConfig,
	DATABASE_CONFIG_KEY,
	DATABASE_CONNECTIONS,
	databaseConfig,
	DatabaseConfig,
	EnvValidation,
} from "@open-press/backend-config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards";
import { TemplateModule } from "./template/template.module";

@Module({
	imports:   [
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
					uri:
					        `mongodb://` +
					        `${db_config[DATABASE_CONNECTIONS.default].username}:` +
					        `${db_config[DATABASE_CONNECTIONS.default].password}@` +
					        `${db_config[DATABASE_CONNECTIONS.default].host}:` +
					        `${db_config[DATABASE_CONNECTIONS.default].port}/`,
				};
			},
			connectionName: DATABASE_CONNECTIONS.default,
		}),
		AuthModule,
		TemplateModule,
	],
	providers: [
		{
			provide:  APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
		{
			provide:  APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {
}
