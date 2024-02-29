import express from "express";
import { registerUser } from "../Controller/RegisterController.js";
const router = express.Router();

router.post("/route/register", registerUser);

export default router;
