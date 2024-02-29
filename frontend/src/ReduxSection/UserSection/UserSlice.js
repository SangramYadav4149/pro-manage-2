import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToBacklog,
  addToDone,
  addToInProgress,
  addToToDo,
  changeUserPassword,
  createTodo,
  deleteTask,
  editTask,
  getUser,
  getUserAllCreatedTasksInfo,
  getUserAllTasks,
  loginUser,
  registerUser,
} from "./UserAPI";

const initialState = {
  user: {},
  toggle: false,
  todo: [],
  backlog: [],
  inProgress: [],
  done: [],
  allTodo: 0,
  allBacklog: 0,
  allInProgress: 0,
  allDone: 0,
  reFatchAlltasksToggle: false,
  allHighPriority: 0,
  allModeratePriority: 0,
  allLowPriority: 0,
  allDueDateTasks: 0,
  loginError: false,
};

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data) => {
    try {
      const response = await registerUser(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const createTodoAsync = createAsyncThunk(
  "board/createTodo",
  async (data) => {
    try {
      const response = await createTodo(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await getUser();
    return response.data;
  } catch (error) {
    return Error(error);
  }
});

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  const response = await loginUser(data);
  return response.data;
});

export const addToBacklogAsync = createAsyncThunk(
  "user/addToBacklog",
  async (data) => {
    try {
      const response = await addToBacklog(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);

export const getUserAllTasksAsync = createAsyncThunk(
  "user/allTasks",
  async () => {
    try {
      const response = await getUserAllTasks();
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const addToTodoAsync = createAsyncThunk(
  "user/addToTodo",
  async (data) => {
    try {
      const response = await addToToDo(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const addToDoneAsync = createAsyncThunk(
  "user/addToDone",
  async (data) => {
    try {
      const response = await addToDone(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const addToInProgressAsync = createAsyncThunk(
  "user/addToInProgress",
  async (data) => {
    try {
      const response = await addToInProgress(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const editTaskAsync = createAsyncThunk(
  "user/updateTask",
  async (data) => {
    try {
      const response = await editTask(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const deleteTaskAsync = createAsyncThunk(
  "user/deleteTask",
  async (data) => {
    try {
      const response = await deleteTask(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const getUserAllCreatedTasksInfoAsync = createAsyncThunk(
  "user/getUserAllCreatedTasksInfo",
  async () => {
    try {
      const response = await getUserAllCreatedTasksInfo();
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);

export const changeUserPasswordAsync = createAsyncThunk(
  "user/cahngePassword",
  async (data) => {
    try {
      const response = await changeUserPassword(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
const UserSlice = createSlice({
  name: "userRedux",
  initialState,
  reducers: {
    setLogOut: (state) => {
      state.user = {};
      localStorage.removeItem("TOKEN");
      state.todo = [];
      state.backlog = [];
      state.inProgress = [];
      state.done = [];
      state.allBacklog = 0;
      state.allTodo = 0;
      state.allInProgress = 0;
      state.allDone = 0;
      state.allHighPriority = 0;
      state.allModeratePriority = 0;
      state.allLowPriority = 0;
      state.allDueDateTasks = 0;
      state.toggle = state.toggle ? false : true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state, action) => {})
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        localStorage.setItem("TOKEN", token);
        state.user = user;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {})
      .addCase(loginUserAsync.pending, (state, action) => {
        state.loginError = false;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.loginError = false;
        localStorage.setItem("TOKEN", token);
        state.user = user;
        state.toggle = state.toggle ? false : true;
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loginError = true;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(getUserAsync.pending, (state, action) => {})
      .addCase(getUserAsync.fulfilled, (state, action) => {
        const { user } = action.payload;

        state.user = user;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(getUserAsync.rejected, (state, action) => {})
      .addCase(createTodoAsync.pending, (state, action) => {})
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(createTodoAsync.rejected, (state, action) => {})
      .addCase(getUserAllTasksAsync.pending, (state, action) => {})
      .addCase(getUserAllTasksAsync.fulfilled, (state, action) => {
        const { backlog, todo, inProgress, done } = action.payload;
        state.backlog = backlog;
        state.todo = todo;
        state.inProgress = inProgress;
        state.done = done;
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? true
          : false;
      })
      .addCase(getUserAllTasksAsync.rejected, (state, action) => {})
      .addCase(addToBacklogAsync.pending, (state, action) => {})
      .addCase(addToBacklogAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToBacklogAsync.rejected, (state, action) => {})
      .addCase(addToTodoAsync.pending, (state, action) => {})
      .addCase(addToTodoAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToTodoAsync.rejected, (state, action) => {})
      .addCase(addToDoneAsync.pending, (state, action) => {})
      .addCase(addToDoneAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToDoneAsync.rejected, (state, action) => {})
      .addCase(addToInProgressAsync.pending, (state, action) => {})
      .addCase(addToInProgressAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToInProgressAsync.rejected, (state, action) => {})
      .addCase(editTaskAsync.pending, (state, action) => {})
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(editTaskAsync.rejected, (state, action) => {})
      .addCase(deleteTaskAsync.pending, (state, action) => {})
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {})
      .addCase(getUserAllCreatedTasksInfoAsync.pending, (state, action) => {})
      .addCase(getUserAllCreatedTasksInfoAsync.fulfilled, (state, action) => {
        const {
          backlog,
          todo,
          inProgress,
          done,
          highPriority,
          moderatePriority,
          lowPriority,
          dueDate,
        } = action.payload;
        state.allBacklog = backlog;
        state.allTodo = todo;
        state.allInProgress = inProgress;
        state.allDone = done;
        state.allHighPriority = highPriority;
        state.allModeratePriority = moderatePriority;
        state.allLowPriority = lowPriority;
        state.allDueDateTasks = dueDate;
      })
      .addCase(getUserAllCreatedTasksInfoAsync.rejected, (state, action) => {})
      .addCase(changeUserPasswordAsync.pending, (state, action) => {})
      .addCase(changeUserPasswordAsync.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(changeUserPasswordAsync.rejected, (state, action) => {});
  },
});

export const { setLogOut } = UserSlice.actions;
export const allTodo = (state) => state.user.allTodo;
export const loginError = (state) => state.user.loginError;
export const allBacklog = (state) => state.user.allBacklog;
export const allInProgress = (state) => state.user.allInProgress;
export const allDone = (state) => state.user.allDone;
export const allHighPriority = (state) => state.user.allHighPriority;
export const allModeratePriority = (state) => state.user.allModeratePriority;
export const allLowPriority = (state) => state.user.allLowPriority;
export const allDueDateTasks = (state) => state.user.allDueDateTasks;
export const user = (state) => state.user.user;
export const toggle = (state) => state.user.toggle;
export const backlog = (state) => state.user.backlog;
export const todo = (state) => state.user.todo;
export const inProgress = (state) => state.user.inProgress;
export const done = (state) => state.user.done;
export const reFatchAlltasksToggle = (state) =>
  state.user.reFatchAlltasksToggle;
export default UserSlice.reducer;
