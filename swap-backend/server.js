const express = require("express");
const app = express();
require("dotenv").config();

// for too large request erro
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const cors = require("cors");
app.use(cors())

const connectDb = require("./config/db");
connectDb();

const productRouter = require("./router/productsRouter");
app.use(productRouter)

const authRouter = require("./router/authRouter");
app.use(authRouter)

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("GET from the home page")
})

app.listen(PORT,()=>{
    console.log(`Server connected to Port ${PORT}`)
})