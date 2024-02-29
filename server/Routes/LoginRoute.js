import express from "express";
import { registerUser } from "../Controller/RegisterController.js";
import { loginUser } from "../Controller/LoginUserController.js";
const router = express.Router();

router.post("/route/login", loginUser);

export default router;
