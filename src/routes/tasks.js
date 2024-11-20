import { Router } from "express";
import { body } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJWT.js";


const taskRouter = Router();


taskRouter.get("/", validarJWT, (req, res) => {
    console.log(req.user.id)
    res.json("Tasks")
})


export default taskRouter;