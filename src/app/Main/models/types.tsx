export interface AddNewPostResponse {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    author: {
        id: string;
        username: string;
    };
    likesCount: number;
    isLiked: boolean;
    commentsCount: number;
    comments?: [];
}

export type GetPostsResponse = AddNewPostResponse[];

export interface AddNewPostRequest {
    id?: number;
    text: string;
}

export interface GetPostsRequest {
    page?: number;
    limit?: number;
}

export interface GetCommentsRequest {
    id: number;
    params: {
        page?: number;
        limit?: number;
    };
}

export interface AddNewCommentResponse {
    id: number;
    text: string;
    createdAt: string;
    author: {
        id: string;
        username: string;
    };
}

export interface AddNewCommentRequest {
    id: number;
    text: string;
}

export type GetCommentResponse = AddNewCommentResponse[];

export interface DeletePostRequest {
    id: number;
}

export interface AddLikeRequest {
    id: number;
}

export interface GetPostsByUserID {
    userId: number;
    params: {
        page?: number;
        limit?: number;
    };
}