const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    tags:{
        type:[String]
    },
    urgency:{
        type:Number,
        min:1,
        max:5
    },
    complete:{
        type:Boolean,
        default:false
    },
    icon:{
        type:String
    },
    status:{
        type:String,
        enum:["Assigned","in process","Complete","Canceled"],
        default:"Assigned"
    },
    deadline:
    {
        type:mongoose.Schema.Types.Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            return date;
        }
    }
},{
    timestamps:true
})
module.exports=mongoose.model('Task',taskSchema)