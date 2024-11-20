import express from "express";
import cors from "cors";
import morgan from "morgan";
import { userRouter} from "../routes/index.js";

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.routes();
    }

    //middlewares and setting
    middlewares(){
        this.app.set("json spaces", 2)
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(morgan("dev"))
        this.app.use(cors())
    }

    //routes
    routes(){
        this.app.use("/api/user/", userRouter)
    }

    //listen
    listen(){
        this.app.listen(this.port, () => console.log(`Server is running on port: ${this.port}`) )
    }
}

export default Server;