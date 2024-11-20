import { Router } from "express";
import { userAuth, userRegister } from "../controllers/user.js";


const userRouter = Router();

userRouter.get("/register", userRegister)
userRouter.get("/auth", userAuth)

export default userRouter;