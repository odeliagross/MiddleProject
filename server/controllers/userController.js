const User=require("../models/User")
const express=require("express")
const app=express()
app.use(express.json())

const getAllUsers=async(req,res)=>{
    const users=await User.find().lean()
        res.json(users)
}
const getUserById=async(req,res)=>{
    const {userId} = req.params
    const users=await User.findById(userId).lean()
    if(!users)
        return res.status(404).send("user does not exist")
    res.json(users)
}

const createUser=async(req,res)=>{
    const {username,address,name,email,phone}=req.body
    if(!username || !name || !phone)
        return res.status(400).json({ message: "username, phone and name are required" })
    try{
        const userNameQ=await User.findOne({username})
        if(userNameQ)
            return res.status(400).json({message:"username is not unique"})
        const phoneQ= await User.findOne({phone})
        if(phoneQ)
            return res.status(400).json({message :"a uesr with this phone exists"})
        const user= await User.create({username,address,name,email,phone})
        if(!user)
            return res.status(404).json({message:"could not create"})
        res.json(user)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: `Server error: ${err.message}` })
    }
}
const deleteUser=async(req,res)=>{
    const{id}=req.body
    if(!id)
        return res.status(403).send("id required")
    const user=User.findById(id)
    if(!user)
        return res.status(404).send("user dos not exist")
    await user.deleteOne()
    res.send("delete complete")
}
const updateUser=async(req,res)=>{
    const {userId} = req.params
    if(!userId)
        return res.status(400).send({message:"id is required"})
    const{name,address,email,phone}=req.body
    try{
        const user=await User.findById(userId)
        if(!user)
            return res.status(404).send({message: "could not find user"})
        user.name=name
        if(address)
        {
            if(address.city) user.address.city=address.city
            if(address.country)user.address.country=address.country
            if(address.houseNumber){user.address.houseNumber=address.houseNumber}
            if(address.street){user.address.street=address.street}
        }
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email, _id: { $ne: userId } })
            if (existingEmail) return res.status(400).json({message:"Email exists"})
            user.email = email
        }
        if(phone && phone!==user.phone){
            const existingPhone=await User.findOne({phone,_id:{$ne : userId}})
            if(existingPhone) return res.status(400).json({message:"Phone exists"})
                user.phone=phone
        }
    
        const savedUser= await user.save()
        res.send(savedUser)
  }catch(err){    console.error(err);
    res.status(500).json({ message: `Server error: ${err.message}` })}
}

module.exports={getAllUsers,getUserById,createUser,deleteUser,updateUser}