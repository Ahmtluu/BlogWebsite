import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { postsApiSlice } from "./features/posts/postApiSlice";
import { userApiSlice } from "./features/users/userApiSlice";

export const store =configureStore({
    reducer:{
        [postsApiSlice.reducerPath]:postsApiSlice.reducer,
        [userApiSlice.reducerPath]:userApiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(postsApiSlice.middleware,userApiSlice.middleware)
    }
})