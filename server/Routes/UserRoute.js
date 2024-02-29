import express from "express";

import { AthenticateUser } from "../MiddleWare/AuthenticateUser.js";
import {
  changeUserPassword,
  getUser,
  getUserAllTasks,
} from "../Controller/UserController.js";

const router = express.Router();

router
  .get("/route/user", AthenticateUser, getUser)
  .get("/route/user/alltasks", AthenticateUser, getUserAllTasks)
  .post("/route/user/change/password", AthenticateUser, changeUserPassword);

export default router;
