import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_ENDPOINT_KEY = "is_public_endpoint";
export const PublicEndpoint = () => SetMetadata(IS_PUBLIC_ENDPOINT_KEY, true);
