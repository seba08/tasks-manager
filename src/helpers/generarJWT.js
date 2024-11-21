import jwt from "jsonwebtoken";



const generarJWT = (id) => {
    return jwt.sign({id}, "misecreto", {expiresIn: "1h"})
}


export default generarJWT;