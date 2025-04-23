const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        require:true,
        type:String
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        require:true
    },
    phone:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        city: { type: String},
        country: { type: String},
        street: { type: String},
        houseNumber: { type: Number}       
    }
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)