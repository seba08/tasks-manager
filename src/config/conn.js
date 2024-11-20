
import mongoose from "mongoose";


const dbConnection = async () => {

    const URI = process.env.MONGODB_URI;

    try {
        mongoose.connect(URI)
        console.log(`Conexión exitosa...!`)
    } catch (error) {
        console.error(`Error al conectarse a la BD`, error)
    }

}


export default dbConnection;