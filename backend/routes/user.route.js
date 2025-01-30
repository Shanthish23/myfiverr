import express from 'express';
import { deleteUser } from '../controllers/user.controller.js';
// import { verifyToken } from '../middleware/jwt.js';
// import { Router } from 'express';

const router=express.Router();

router.get("/register",)
router.get("/login",)
router.delete("/:id",deleteUser)

export default router;