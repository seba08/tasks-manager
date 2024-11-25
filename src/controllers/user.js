import jwt from "jsonwebtoken";
import { USERS } from "../models/index.js"
import { generarJWT, generarJWTTemporal } from "../helpers/generarJWT.js";
import sendMail from "../helpers/mailer.js";


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
    console.log(email, password)

    try {
        //Validar que el correo existe en la base de datos
        const userExist = await USERS.findOne({email})
        if(!userExist){
            return res.status(400).json({
                msg: "El usuario no existe en la BD, registrate...!",
            })
        }
        
        //Validar que las contraseñas coinciden, esta validación se hizo en el modelo
        userExist.comparePassword(password)
        .then(response => {
            if(!response){
                return res.status(401).json({msg: "Usuario incorrecto...!"})
            }else{
                
                //Generar JWT
                const token = generarJWT(userExist.id, userExist.role)
                
                console.log("Usuario logueado: ", userExist)
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
            }
        })
        .catch(err => {
            if(err){
                console.log(err)
                return res.status(400).json({msg: `Error al validar las contraseñas...!`})
            }
        })
    

    } catch (error) {
        throw new Error(`Error al loguear al usuario ${error}`)
    }
}



const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        
        //Validar que el usuario existe
        const user = await  USERS.findOne({email});
        if(!user){
           return res.status(404).json({
                msg: "Usuario no encontrado"
            })
        }

        //Generar un token de recuperacion (válido por 15 mnts)
        const token = generarJWTTemporal(user.id)

        //Enviar correo con el enlace de recuperacion
        const resetLink = `http://localhost:8080/api/user/reset-password/?token=${token}`

        await sendMail(
            user.email,
            'Recuperación de contraseña',
            `Haz clic en el siguiente enlace para recuperar tu contraseña: ${resetLink}`,
            `<p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p><a href="${resetLink}">Recuperar contraseña</a>`
        );

        res.status(200).json({
            msg: "Correo de recuperación enviado..."
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al enviar el correo:", error
        })
    }
}


const resetPassword = async (req, res) => {

    const { token, newPassword } = req.body;

    try {

        //Verificar el token (Validar con el middleware)
        const decoded = jwt.verify(token, "misecreto");

        //Buscar el usuario y actualizar contraseña
        const user = await USERS.findById(decoded.id)

        if(!user){
            return  res.status(404).json({msg: "Usuario no encontrado"})
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({msg: "Contraseña actualizada exitosamente...!"})
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(400).json({msg: "El token ha expirado"})
        }
        res.status(500).json({msg: "Error al restablecer la contraseña"})
    }

}

export {
    userRegister,
    userAuth,
    forgotPassword,
    resetPassword
}