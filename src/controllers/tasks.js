import { request, response } from "express"
import { TASKS, USERS } from "../models/index.js"

const getTasks = async (req, res) =>{
    const tasks = await TASKS.find().populate({path: "user", select: "name"})
    const total = await TASKS.countDocuments();
    res.status(200).json({
        total,
        tasks
    })
}


const addTask = async (req = request, res = response) =>{
    const {id, role} = req.user;

    try{

        if(role !== "ADMIN_ROLE"){
            return res.status(401).json({
                msg: `El rol ${role} no tiene permiso para ejecutar esta acción...!`
            })
        }
        //Agregar tarea, el usuario necesita loguearse
       const newTask = new TASKS({...req.body, "user": id})
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

        const updateTask = await TASKS.findByIdAndUpdate(id, {...req.body, 'user': req.user.id}, {new: true})
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


const deleteTask = async (req, res) => {

    const {id} = req.params;
    const {role} = req.user;
    try {
        if(role !== "ADMIN_ROLE"){
            return res.status(401).json({
                msg: `El rol ${role} no tiene permiso para ejecutar esta acción...!`
            })
        }

        //Validar si existe la tarea por el id
        const taskExist = await TASKS.findById(id)
        if(!taskExist) {
            return res.status(404).json({
                msg: "La tarea no se encuentra en la BD..."
            })
        }

        await TASKS.findByIdAndDelete(taskExist.id);
        res.status(200).json({
            msg: "Deleted task",
        })
    } catch (error) {
        res.status(400).json({
            msg: "Error al eliminar la tarea..."
        })
    }
    
}


export {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}