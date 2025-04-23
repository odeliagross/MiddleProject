const express=require("express")
const router=express.Router()
const User=require("../models/User");
const userController=require("../controllers/userController")

router.get('/',userController.getAllUsers)

router.get('/:userId',userController.getUserById)

router.post('/',userController.createUser)

router.patch('/:userId',userController.updateUser)

router.delete('/',userController.deleteUser)
module.exports=router
