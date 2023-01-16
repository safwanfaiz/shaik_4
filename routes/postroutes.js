const express = require("express");
const { validator } = require("../middleware/auth");
const { postModel } = require("../models/postmodel");
const userModel= require("../models/usermodel");


const app= express.Router();
 app.use(validator);
//get
 app.get("/", async (req,res)=> {
    let {_id} =req.userDeatails;
    let udata= await postModel.find({user: _id}).populate("user").then(r=>r)
    res.send(udata);
 })

 //post
 app.post('/create', async (req,res) => {
  const {title,body,device} =req.body;
  try {
    let nPost= new postModel({title,body,device})
    await nPost.save();
    res.send(nPost)
  } catch (error) {
    res.send(error)
  }
 })

 app.patch("/update/:id", async (req, res) => {
    const {id} =req.params;
    try {
        await postModel.findByIdAndUpdate(id,{$set :{body}})
        res.send("Updated succesfully");
    } catch (error) {
        res.send(error)
    }
 })


 app.delete("/delete/:id", async (req, res) => {
    const {id} =req.params;
    try {
        await postModel.findOneAndDelete (id)
        res.send("Deleted succesfully");
    } catch (error) {
        res.send(error)
    }
 })
 module.exports=app;
