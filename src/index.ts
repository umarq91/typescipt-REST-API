import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
const app = express();
import dotenv from "dotenv"
import routes from "./routes"
dotenv.config();

app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)


// Database connection
const url = process.env.MONGO_URL
mongoose.Promise = Promise; // sets the Mongoose library to use the built-in ES6 Promise implementation.
mongoose.connect(url)
let db = mongoose.connection;
db.once('open',()=>console.log("Connected"))
db.on('error',(err:Error)=>console.log(err))

// Routes
app.use("/",routes)


server.listen(8080,async()=>{
    console.log("Server Running !");

})

