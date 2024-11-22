import { Router } from "express";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJWT.js";
import { addTask, updateTask } from "../controllers/tasks.js";


const taskRouter = Router();


taskRouter.get("/", validarJWT, (req, res) => {
    console.log(req.user.id)
    res.status(200).json({
        msg: "Getting tasks"
    })
})

taskRouter.post("/add", 
    validarJWT, 
    body("title",).notEmpty().withMessage("Es titulo de la tarea no puede estar vacío"),
    body("priority").isIn(["baja", "media", "alta"]).withMessage("La prioridad no es valida"),
    validarCampos,
    addTask)


taskRouter.put("/:id",
    validarJWT,
    param("id").isMongoId().withMessage("No es un ID de mongo válido"),
    validarCampos,
    updateTask)

taskRouter.delete("/:id", (req, res) => {
    res.status(201).json({
        msg: "Deleting task"
    })
})

export default taskRouter;