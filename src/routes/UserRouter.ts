import express from "express";
import { userControllerCreate, userControllerDelete, userControllerLogin, userControllerProfile, userControllerUpdate } from "../controllers/UserController";
import { authMiddleware } from "../midderares/authMiddleware";

const router = express.Router();

router.post("/users", userControllerCreate);

router.delete("/users/:id", authMiddleware,  userControllerDelete);

router.put("/users", authMiddleware, userControllerUpdate);

router.post('/login', userControllerLogin);

router.get('/profile', authMiddleware, userControllerProfile);



// router.get('/favoritefonts');

// router.get('/font_links')


export default router;
