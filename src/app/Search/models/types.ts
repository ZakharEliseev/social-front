import { ProfileResponse } from "@/app/Auth/models/types";

export interface GetUsersResponse extends ProfileResponse {};

export type GetUsersResponseList = GetUsersResponse[];

export interface FollowUser {
    id: number;
    isFollow: boolean;
}