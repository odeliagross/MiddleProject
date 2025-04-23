const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const taskController=require("../controllers/taskController")


router.get('/',taskController.getAllTasks)
router.get("/:taskId", taskController.getTaskById)
router.post('/',taskController.createTask)
router.patch('/:taskId',taskController.updateTask)
router.delete('/',taskController.deleteTask)

module.exports=router