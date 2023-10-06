import { SetMetadata } from "@nestjs/common";

export const IS_API_PUBLIC = "isPublic";
export const ApiPublic = ()=> SetMetadata(IS_API_PUBLIC, true);