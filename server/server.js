const express=require("express")
require("dotenv").config()
const { default: mongoose } = require("mongoose")
const cors=require("cors")

const connectDB=require("./config/dbConnect")
const corsOptions=require("./config/corsOptions")
const app=express()
const PORT=process.env.PORT ||   2500

connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
  res.send("home page")
})

app.use("/api/users",require("./routes/userRout"))
app.use("/api/tasks",require("./routes/taskRout"))
app.use("/api/posts",require("./routes/postsRout"))

mongoose.connection.once('open',()=>{
  console.log("connect to db succeeded")
  app.listen(PORT,()=>{
  console.log(`server running on prort ${PORT}`)
})
})

mongoose.connection.on('error',err=>{
  console.log(err)
})
