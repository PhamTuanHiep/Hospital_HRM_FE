import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountSlice from "../features/auth/constants/accountSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedDataReducer = persistReducer(persistConfig, accountSlice);

export const store = configureStore({
  reducer: {
    account_user: persistedDataReducer,

    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});
// Tạo persistor để sử dụng trong PersistGate
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
