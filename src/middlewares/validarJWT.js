import { request } from "express";
import jwt from "jsonwebtoken";




const validarJWT = async (req = request, res, next) => {



    try {
        const token = req.header("x-token")
        if(!token){
            return res.status(400).json({
                msg: "No hay token en la petición"
            })

        }
        jwt.verify(token, "misecreto", (err, decoded) => {
            if(err){
                if(err.name = "TokenExpiredError"){
                    return res.status(401).json({msg: "El token ha expirado. Por favor, inicia sesión nuevamente."})
                }

                return res.status(401).json({msg: "Token inválido"})
            }

            req.user = decoded;
            next();
        })
    } catch (error) {
        throw new Error(`Error al validar el token: ${error}`)
    }
}

export {
    validarJWT
}