import express from "express";
import { userControllerCreate, userControllerDelete, userControllerLogin } from "../controllers/UserController";
const router = express.Router();

router.post("/users", userControllerCreate)

router.delete("/users/:id", userControllerDelete)

router.post('/login', userControllerLogin)

// router.get('/profile', authMiddleware, )

export default router;
