import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  createTask: false,
  toggle: false,
  backlogCollapseToggle: false,
  toDoCollapseToggle: false,
  inProgressCollapseToggle: false,
  doneCollapseToggle: false,
  editTask: {},
  shareTaskLink: "",
  backlogCollapse: false,
  toDoCollapse: false,
  inProgressCollapse: false,
  doneCollapse: false,
  deleteTask: {},
  logOut: false,
};

const BoardSlice = createSlice({
  name: "boardRedux",
  initialState,
  reducers: {
    toggleCreateTask: (state) => {
      state.createTask = state.createTask ? false : true;
      state.toggle = state.toggle ? false : true;
    },

    setBackLogCollapse: (state, action) => {
      const { status } = action.payload;
      state.backlogCollapse = status;
      state.backlogCollapseToggle = state.backlogCollapseToggle ? false : true;
    },
    setToDoCollapse: (state, action) => {
      const { status } = action.payload;
      state.toDoCollapse = status;
      state.toDoCollapseToggle = state.toDoCollapseToggle ? false : true;
    },
    setInProgressCollapse: (state, action) => {
      const { status } = action.payload;
      state.inProgressCollapse = status;
      state.inProgressCollapseToggle = state.inProgressCollapseToggle
        ? false
        : true;
    },
    setDoneCollapse: (state, action) => {
      const { status } = action.payload;
      state.doneCollapse = status;
      state.doneCollapseToggle = state.doneCollapseToggle ? false : true;
    },
    setEditTask: (state, action) => {
      state.editTask = action.payload;
      state.toggle = state.toggle ? false : true;
    },
    clearEditTask: (state) => {
      state.editTask = {};
      state.toggle = state.toggle ? false : true;
    },
    setDeleteTask: (state, action) => {
      state.deleteTask = action.payload;
      state.toggle = state.toggle ? false : true;
    },
    clearDeleteTask: (state) => {
      state.deleteTask = {};
      state.toggle = state.toggle ? false : true;
    },
    setShareTaskLink: (state, action) => {
      const { shareLink } = action.payload;
      state.shareTaskLink = shareLink;
      state.toggle = state.toggle ? false : true;
    },
    clearShareLink: (state) => {
      state.shareTaskLink = "";
      state.toggle = state.toggle ? false : true;
    },
    setUserLogoutTrue: (state) => {
      state.logOut = true;
      state.toggle = state.toggle ? false : true;
    },
    setUserLogoutfalse: (state) => {
      state.logOut = false;
      state.toggle = state.toggle ? false : true;
    },
  },
});

export const {
  toggleCreateTask,
  setDeleteTask,
  clearDeleteTask,
  setBackLogCollapse,
  setToDoCollapse,
  setInProgressCollapse,
  setDoneCollapse,
  setEditTask,
  clearEditTask,
  setShareTaskLink,
  clearShareLink,
  setUserLogoutTrue,
  setUserLogoutfalse,
} = BoardSlice.actions;
export const createTask = (state) => state.board.createTask;
export const toggle = (state) => state.board.toggle;
export const logOut = (state) => state.board.logOut;
export const shareTaskLink = (state) => state.board.shareTaskLink;
export const toDoCollapseToggle = (state) => state.board.toDoCollapseToggle;
export const backlogCollapseToggle = (state) =>
  state.board.backlogCollapseToggle;
export const inProgressCollapseToggle = (state) =>
  state.board.inProgressCollapseToggle;
export const doneCollapseToggle = (state) => state.board.doneCollapseToggle;
export const deleteTask = (state) => state.board.deleteTask;
export const backlogCollapse = (state) => state.board.backlogCollapse;
export const toDoCollapse = (state) => state.board.toDoCollapse;
export const inProgressCollapse = (state) => state.board.inProgressCollapse;
export const doneCollapsee = (state) => state.board.doneCollapse;
export const editTask = (state) => state.board.editTask;
export default BoardSlice.reducer;
