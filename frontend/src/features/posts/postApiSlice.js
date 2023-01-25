import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL="http://localhost:3001";

export const postsApiSlice = createApi({
    reducerPath:"post-api",
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL
    }),
    endpoints(builder){
        return {
            fetchAllPosts:builder.query({
                query(){
                    return `posts`
                }
            }),
            fetchSinglePost:builder.query({
                query(id){
                    return `posts/${id}`
                }
            })
        }
    }
});

export const {useFetchAllPostsQuery, useFetchSinglePostQuery} = postsApiSlice;