const Task=require("../models/Task")
const express=require("express")
const app=express()
app.use(express.json())

const getAllTasks=async(req,res)=>{
    const tasks=await Task.find().lean()
    res.json(tasks)
}
const getTaskById = async (req,res)=>{
    const {taskId} = req.params
    const task = await Task.findById(taskId).lean()
    if(!task)
        return res.status(404).send("could not finde task")
    res.json(task)
}
const createTask=async(req,res)=>{
    const {title,tags,urgency,icon,status,deadline}=req.body
    if(!title)
        return res.status(404).send("title is required")
    const task=await Task.create({title,tags,urgency,icon,status,deadline})
    if(!task)
        return res.status(400).send("could not create")
    res.send(task)
}
const deleteTask=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
       return res.status(400).send("id required")
    const task=await Task.findById(_id)
    if(!task)
        return res.status(404).send("could not find task")
    await task.deleteOne()
    res.send("delte complete")
}
const updateTask=async(req,res)=>{
    const {taskId} = req.params
    if(!taskId)
        return res.status(400).send("id is required")
    const{title,tags,urgency,icon,status,deadline,complete}=req.body
    const updatedData={title,tags,urgency,icon,status,deadline,complete}
    const updatedTask = await Task.findByIdAndUpdate(taskId,updatedData,{ new: true });
    if(!updatedTask)
        return res.status(400).send("faled updating current task")
    res.json(updatedTask)
}
module.exports={getAllTasks,createTask,updateTask,deleteTask,getTaskById}