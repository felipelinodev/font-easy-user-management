import express from "express";
import { userControllerCreate, userControllerDelete, userControllerLogin, userControllerProfile, userControllerUpdate } from "../controllers/UserController";
import { authMiddleware } from "../midderares/authMiddleware";
import { fontsControllerCreate, getAllFavoriteFontsController } from "../controllers/FavoriteFontsController";

const router = express.Router();

router.post("/users", userControllerCreate);

router.delete("/users/:id", authMiddleware,  userControllerDelete);

router.put("/users", authMiddleware, userControllerUpdate);

router.post('/login', userControllerLogin);

router.get('/profile', authMiddleware, userControllerProfile);



router.post('/favoritefonts', authMiddleware, fontsControllerCreate);

router.get('/favoritefonts', authMiddleware, getAllFavoriteFontsController);

//router.get('/font_links')


export default router;
