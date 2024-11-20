import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido es requerido"]
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role: {
        type: String,
        default: "USER_ROLE"
    },
    active: {
        type: Boolean,
        default: true
    },
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try {
        //Generar salt con bcrypt
        const salt = await bcrypt.genSalt(10);
        //hash la contraseña
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})


userSchema.methods.comparePassword = async function (candiatePassword) {
    return bcrypt.compare(candiatePassword, this.password)
}

export const USERS = model("user", userSchema)
