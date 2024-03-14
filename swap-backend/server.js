const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const cors = require("cors");
app.use(cors())

const connectDb = require("./config/db");
connectDb();

const productRouter = require("./router/productsRouter");
app.use(productRouter)

const authRouter = require("./router/authRouter");
app.use(authRouter)

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server connected to Port ${PORT}`)
})