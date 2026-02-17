import { ProfileResponse } from '@/app/Auth/models/types';

export type GetUsersResponseList = ProfileResponse[];

export interface FollowUserRequest {
    id: number;
    isFollow: boolean;
}

export interface GetProfileByIdRequest {
    userId: number;
}

export interface UpdateProfileRequest {
    email: string;
    bio: string;
}

export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
}
