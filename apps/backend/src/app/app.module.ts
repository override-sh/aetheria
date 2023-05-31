import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DATABASE_CONFIG_KEY, DatabaseConfig, databaseConfig } from "@override/backend-config";
import { EnvValidation } from "@override/backend-config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";

@Module({
	imports:     [
		ConfigModule.forRoot({
			isGlobal:        true,
			cache:           true,
			expandVariables: true,
			load:            [
				databaseConfig,
			],
			validate:        EnvValidation.instance.validateEnv,
		}),
		MongooseModule.forRootAsync({
			inject:     [DATABASE_CONFIG_KEY],
			useFactory: async (db_config: DatabaseConfig): Promise<MongooseModuleFactoryOptions> => {
				return {
					connectionName: "default",
					uri:            `mongodb://${db_config.username}:${db_config.password}@${db_config.host}:${db_config.port}/${db_config.database}`,
				};
			},
		}),
	],
	controllers: [AppController],
	providers:   [AppService],
})
export class AppModule {
}
