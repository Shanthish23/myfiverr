import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)


// we use post because we are putting something to it


export default router;
