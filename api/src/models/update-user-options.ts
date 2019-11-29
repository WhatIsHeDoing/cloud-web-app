import { UserPatch } from "./user-patch";

export interface UpdateUserOptions {
    id: string;
    patch: UserPatch;
}

