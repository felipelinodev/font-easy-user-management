import express from "express";
import { userControllerCreate, userControllerDelete } from "../controllers/UserController";
const router = express.Router();

router.post("/users", userControllerCreate)

router.delete("/users/:id", userControllerDelete)
export default router;
