import { request, response } from "express"
import { TASKS } from "../models/index.js"

const addTask = async (req = request, res = response) =>{
    const userId = req.user.id;

    try {
        //Agregar tarea, el usuario necesita loguearse
       const newTask = new TASKS({...req.body, "user": userId})
       newTask.save();
       res.status(201).json({
           msg: "Task added",
           newTask
       })
   } catch (error) {
    console.log(error.name)
   } 
}
const updateTask = async (req = request, res = response) =>{
    const {id} = req.params
    
    try {
        //Validar si existe la tarea por el id
        const taskExist = await TASKS.findById(id)
        if(!taskExist) {
            return res.status(404).json({
                msg: "La tarea no se encuentra en la BD..."
            })
        }

        const updateTask = await TASKS.findByIdAndUpdate(id, {...req.body, 'user': req.user.id}, {"new": true})
        updateTask.save();
        res.status(200).json({
            msg: "Updated task",
            updateTask
        })
    } catch (error) {
        res.status(400).json({
            msg: "Error al actualizar la tarea..."
        })
    }
}




export {
    addTask,
    updateTask
}