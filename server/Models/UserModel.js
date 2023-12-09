import mongoose from "mongoose";



const userschema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        profilepicture:String,
        coverpicture:String,
        about:String,
        livesin:String,
        worksat:String,
        relationship:String,
        country:String,
        followers:[],
        following:[],

        
    },
    {timestamps:true}
)

const usermodel=mongoose.model("users",userschema);

export default usermodel