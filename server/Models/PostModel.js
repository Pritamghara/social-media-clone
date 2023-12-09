import mongoose from "mongoose";


const postschema=mongoose.Schema({
    userid:{type:String,
               required:true },

               desc:String,
               likes:[],
               image:String,
},{
    timestamps:true
}
)


var PostModel=mongoose.model("Post",postschema)
export default PostModel