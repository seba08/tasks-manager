import { Router } from "express";
import { userAuth, userRegister } from "../controllers/user.js";
import { body } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";


const userRouter = Router();

userRouter.post("/register", 
    body('name').notEmpty().withMessage("El nombre no puede estar vacío"),
    body('email').notEmpty().withMessage("El correo no puede estar vacío"),
    body('email').isEmail().trim().withMessage("El correo no es válido"),
    body('password').notEmpty().withMessage("La contraseña no puede estar vacía"),
    body('password').isLength({min: 4}).withMessage("La contraseña debe tener al menos 4 caracteres"),
    validarCampos, 
    userRegister)
userRouter.post("/auth",
    body('email').notEmpty().withMessage("El correo no puede estar vacío"),
    body('email').isEmail().withMessage("No es un correo válido"),
    body('password').notEmpty().withMessage("La contraseña no puede estar vacía"),
    body('password').isLength({min: 4}).withMessage("La contraseña debe tener al menos 4 caracteres"),
    validarCampos,
    userAuth)

export default userRouter;