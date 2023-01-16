const express =require("express")
const {connection} =require("./config/db")
const cors=require("cors")
const postRouter=require("./routes/postroutes")
const userRouter=require("./routes/userroutes")
const { userModel } = require("./models/usermodel")
const { validator } = require("./middleware/auth")


require("dotenv").config()
const appData=express()
appData.use(express.json())
appData.use(cors())
appData.get("/",(req,res)=>{
    
    res.send("Welocome to home page")
})

appData.use("/users", userRouter)
// appData.use(validator)
appData.use("/posts",postRouter)



appData.listen(process.env.PORT, async()=>{
    await connection;
    console.log(`http://localhost:${process.env.PORT}`)
})