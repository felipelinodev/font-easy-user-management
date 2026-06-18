import express from "express";
import { userControllerCreate, userControllerDelete, userControllerLogin, userControllerProfile, userControllerUpdate, userGoogleControllerCreate, userGoogleControllerLogin } from "../controllers/UserController";
import { authMiddleware } from "../midderares/authMiddleware";
import { favoriteFontsControllerDelete, fontsControllerCreate, getAllFavoriteFontsController } from "../controllers/FavoriteFontsController";
import { forgotPasswordController, resetPasswordController } from "../controllers/PasswordResetController";

const router = express.Router();

router.post("/users", userControllerCreate);

router.post("/auth/google", userGoogleControllerCreate)

router.post("/auth/google/login", userGoogleControllerLogin)

router.delete("/users/:id", authMiddleware,  userControllerDelete);

router.put("/users", authMiddleware, userControllerUpdate);

router.post('/login', userControllerLogin);

router.get('/profile', authMiddleware, userControllerProfile);



router.post('/favoritefonts', authMiddleware, fontsControllerCreate);

router.get('/favoritefonts', authMiddleware, getAllFavoriteFontsController);

router.delete('/favoritefonts/:id', authMiddleware, favoriteFontsControllerDelete)

router.post('/auth/forgot-password', forgotPasswordController);

router.post('/auth/reset-password', resetPasswordController);


export default router;
