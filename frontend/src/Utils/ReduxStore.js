import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "../ReduxSection/UserBoardSection/BoardSlice";
import UserReducer from "../ReduxSection/UserSection/UserSlice";
import ShareTaskReducer from "../ReduxSection/UserShareTaskSection/ShareTaskSlice";

export const store = configureStore({
  reducer: {
    board: BoardReducer,
    user: UserReducer,
    shareTask: ShareTaskReducer,
  },
});
