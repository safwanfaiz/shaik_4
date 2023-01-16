const express=require("express")
const jwt=require("jsonwebtoken")
const { userModel } = require("../models/usermodel")
const userapp=express.Router()
require("dotenv").config




userapp.post("/register",async(req,res)=>{
    const {name, email, gender, password}=req.body
  try{
    let nUser =new userModel({name, email, gender, password})
    await nUser.save()
    res.send(nUser)
  }catch(e){
    res.send(e.message)
  }

})


userapp.post("/login",async(req,res)=>{
    const {email, password}=req.body
   try{
   let existUser= await userModel.findOne({email, password})
   if(existUser){
    let token=jwt.sign({_id:existUser._id, email:existUser.email},process.env.TOKEN)
   res.send(token)

  

}else{
    res.send("Invalid Credentials")
}
   }catch(e){
 res.send(e.message)
   }


})

module.exports= userapp