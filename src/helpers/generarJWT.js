import jwt from "jsonwebtoken";



const generarJWT = (id) => {
    return jwt.sign({id}, "misecreto", {expiresIn: "1h"})
}
const generarJWTTemporal = (id) => {
    return jwt.sign({id}, "misecreto", {expiresIn: "15m"})
}


export {
    generarJWT,
    generarJWTTemporal
};