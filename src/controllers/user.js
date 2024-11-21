import { USERS } from "../models/index.js"
import generarJWT from "../helpers/generarJWT.js";


//User Register
const userRegister = async (req, res) => {
    const { ...user } = req.body;
    
    try {
        //Validar que el correo no exista en la base de datos
        const userExist = await USERS.findOne({email: user.email})
        if(userExist){
            return res.status(400).json({
                error: "El email se encuentra en la BD",
                data: []
            })
        }
    
        if(!req.body) {
            return res.status(400),json({
                msg: "No viene dato en la petición"
            })
        }
        const newUser = new USERS(user)
        await newUser.save();
        res.status(201).json({
            msg: "Usuario registrado",
            data: newUser
        })
        
    } catch (error) {
        throw new Error(`Error al registrar nuevo usuario: ${error}`)
    }
}

//User Auth

const userAuth = async (req, res) => {

    const {email, password} = req.body;

    try {
        //Validar que el correo existe en la base de datos
        const userExist = await USERS.findOne({email})
        if(!userExist){
            return res.status(400).json({
                msg: "El usuario no existe en la BD, registrate...!",
            })
        }
        
        //Validar que las contraseñas coinciden, esta validación se hizo en el modelo

        if(!userExist.comparePassword(password)){
            return res.status(401).json({
                msg: "Error al registarte, valida la contraseña"
            })
        }


        //Generar JWT
        const token = generarJWT(userExist.id)

        //Login
        res.status(200).json({
            msg: "Logueado",
            user: {
                name: userExist.name,
                email: userExist.email,
                role: userExist.role

            }, 
            token
        })
    } catch (error) {
        throw new Error(`Error al loguear al usuario ${error}`)
    }
}

export {
    userRegister,
    userAuth
}