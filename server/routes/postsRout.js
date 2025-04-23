const express=require("express")
const router=express.Router()
const User=require("../models/Posts");
const postsController=require("../controllers/postsController")

router.get('/',postsController.getAllPosts)

router.get('/:postId',postsController.getPostById)

router.post('/',postsController.createPost)

router.patch('/:postId',postsController.updatePost)

router.delete('/:postId',postsController.deletePost)
module.exports=router

