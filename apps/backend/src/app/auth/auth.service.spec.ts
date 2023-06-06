import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import {
	AUTH_CONFIG_KEY,
	AuthConfig,
	authConfig,
	DATABASE_CONFIG_KEY,
	DATABASE_CONNECTIONS,
	DatabaseConfig,
	databaseConfig,
	EnvValidation,
} from "@override/backend-config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { UserModelModule } from "@override/open-press-models";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { AuthController } from "./auth.controller";

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test
			.createTestingModule({
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
					UserModelModule,
					PassportModule,
					JwtModule.registerAsync({
						inject:     [AUTH_CONFIG_KEY],
						useFactory: (auth_config: AuthConfig): JwtModuleOptions => {
							if (auth_config.jwt.encryption === "symmetric") {
								return {
									secret:      auth_config.jwt.secret,
									signOptions: {
										audience:  auth_config.jwt.audience,
										expiresIn: auth_config.jwt.expires_in,
										issuer:    auth_config.jwt.issuer,
										algorithm: auth_config.jwt.algorithm,
									},
								};
							}
							else {
								return {
									publicKey:   auth_config.jwt.public_key,
									privateKey:  auth_config.jwt.private_key,
									signOptions: {
										audience:  auth_config.jwt.audience,
										expiresIn: auth_config.jwt.expires_in,
										issuer:    auth_config.jwt.issuer,
										algorithm: auth_config.jwt.algorithm,
									},
								};
							}
						},
					}),
				],
				providers:   [
					AuthService,
					LocalStrategy,
					JwtStrategy,
				],
				controllers: [AuthController],
			})
			.compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service)
			.toBeDefined();
	});
});
