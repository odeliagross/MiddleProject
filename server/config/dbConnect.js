const { default: mongoose } = require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
        console.error("error conecting to db"+err)
    }
}
module.exports=connectDB