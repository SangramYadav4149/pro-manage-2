import axios from "axios";
import { getAxiosConfigToken } from "../../Utils/Token";

export const registerUser = async (data) => {
  try {
    return await axios.post(
      "http://localhost:8000/backend/node/v2/api/user/route/register",
      data
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const loginUser = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/backend/node/v2/api/user/route/login",
    data
  );
  return response;
};
export const getUser = async () => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));

    return await axios.get(
      "http://localhost:8000/backend/node/v2/api/get/route/user",

      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const createTodo = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      "http://localhost:8000/backend/node/v2/api/tasks/route/createTodo",
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserAllTasks = async () => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.get(
      "http://localhost:8000/backend/node/v2/api/get/user/alltasks",

      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const addToBacklog = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/tasks/route/add/backlog/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const addToToDo = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/tasks/route/add/todo/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const addToInProgress = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/tasks/route/add/inprogress/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const addToDone = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/tasks/route/add/done/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const editTask = async (data) => {
  try {
    const { task } = data;
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/tasks/route/edit/task/${task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteTask = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/tasks/route/delete/task/${data.id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const getUserAllCreatedTasksInfo = async () => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.get(
      `http://localhost:8000/backend/node/v2/api/tasks/route/get/user/alltasksinfo/`,

      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const changeUserPassword = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:8000/backend/node/v2/api/get/route/user/change/password`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

////promaneger/api/get
