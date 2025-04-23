const Posts=require("../models/Posts")
const express=require("express")
const app=express()
app.use(express.json())

const getAllPosts=async(req,res)=>{
    const posts=await Posts.find().lean()
    res.json(posts)
}

const getPostById = async (req,res)=>{
    const {postId} = req.params
    const post = await Posts.findById(postId).lean()
    if(!post)
        return res.status(404).send("could not finde post")
    res.json(post)
}
const createPost=async(req,res)=>{
    const {title,body}=req.body
    if(!title)
        return res.status(404).send("title is required")
    const post=await Posts.create({title,body})
    if(!post)
        return res.status(400).send("could not create post")
    res.send(post)
}
const deletePost=async(req,res)=>{
    const {postId}=req.params
    if(!postId)
        return res.status(400).send("id is required")
    const post=await Posts.findById(postId)
    if(!post)
        return res.status(404).send("could not find post")
    await post.deleteOne()
    res.send("delte complete")
}
const updatePost=async(req,res)=>{
    const {postId} = req.params
    if(!postId)
        return res.status(400).send("id is required")
    const{title,body}=req.body
    const updatedData={title,body}
    const updatedPost = await Posts.findByIdAndUpdate(postId,updatedData,{ new: true });
    if(!updatedPost)
        return res.status(400).send("faled updating current post")
    res.json(updatedPost)
}



module.exports={getAllPosts,createPost,updatePost,deletePost,getPostById}