
export interface LoginResponse {
    accessToken: string;
    status?: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    createdAt: string;
    email: string;
    id: string;
    username: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface ProfileResponse {
    id: number;
    username: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
    createdAt: string;
}


export interface ProfileResponse {
    id: number;
    username: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
    createdAt: string;
}

export interface AddNewPostResponse {
  id: number;
  title: string;
  text: string;
  createdAt: string,
  author: {
    id: string;
    username: string;
},
likesCount: number;
isLiked: boolean;
commentsCount: number;
comments?: [];
}

export type GetPostsResponse = AddNewPostResponse[];

export interface AddNewPostRequest {
    title?: string;
    text: string;
}

export interface GetPostsRequest {
  offset?: number; 
  limit?: number;
}

export interface GetCommentsRequest {
  id: number;
  params: {
    offset?: number; 
    limit?: number;
  }
}

export interface AddNewCommentResponse {
  id: number;
  text: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    }
}

export interface AddNewCommentRequest {
  id: number;
  text: string;
}

export type GetCommentResponse = AddNewCommentResponse[];