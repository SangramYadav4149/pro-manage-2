import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShareTask } from "./ShareTaskAPI";

const initialState = {
  task: {},
  toggle: false,
};

export const getShareTaskAsync = createAsyncThunk(
  "shareTask/getTask",
  async (data) => {
    try {
      const response = await getShareTask(data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const ShareTaskSlice = createSlice({
  name: "shareTask",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getShareTaskAsync.pending, (state, action) => {})
      .addCase(getShareTaskAsync.fulfilled, (state, action) => {
        if (!state.task?.id) {
          const { task } = action.payload;
          state.task = task;
          state.toggle = state.toggle ? false : true;
        }
      })
      .addCase(getShareTaskAsync.rejected, (state, action) => {});
  },
});
export const task = (state) => state.shareTask.task;
export const toggle = (state) => state.shareTask.toggle;
export default ShareTaskSlice.reducer;
