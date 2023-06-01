interface IHashConfig {
	algorithm: "bcrypt";
	iterations: number;
	version: "a" | "b";
}

export interface IAuthConfig {
	hashing: IHashConfig;
}