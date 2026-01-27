import { socialApi } from "@/app/api";

export const useGetMyPosts = () => {
    const { data, isLoading, refetch } = socialApi.useGetMyPostsQuery({
        offset: 0,
        limit: 20,
    });  
    
    return {
        data,
        isLoading,
        refetch
    };};
