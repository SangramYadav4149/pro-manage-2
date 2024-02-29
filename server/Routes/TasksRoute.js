import express from "express";
import {
  addToBacklog,
  addToDone,
  addToInProgress,
  addToToDo,
  createTodo,
  deleteTask,
  editTask,
  getShareTask,
  getUserAllCreatedTasksInfo,
} from "../Controller/TasksController.js";
import { AthenticateUser } from "../MiddleWare/AuthenticateUser.js";

const router = express.Router();

router
  .get(
    "route/get/user/alltasksinfo",
    AthenticateUser,
    getUserAllCreatedTasksInfo
  )
  .get("route/get/share/task/:id", getShareTask)
  .post("route/createTodo", AthenticateUser, createTodo)
  .post("route/add/backlog/:id", AthenticateUser, addToBacklog)
  .post("route/add/todo/:id", AthenticateUser, addToToDo)
  .post("route/add/inprogress/:id", AthenticateUser, addToInProgress)
  .post("route/add/done/:id", AthenticateUser, addToDone)
  .post("route/edit/task/:id", AthenticateUser, editTask)
  .post("route/delete/task/:id", AthenticateUser, deleteTask);

export default router;
