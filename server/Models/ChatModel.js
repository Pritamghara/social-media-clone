

import mongoose from 'mongoose'


const chatschema=mongoose.Schema({
    members:{
        type:Array
    },
},
    {
        timestamps:true,
    }

)

const ChatModel=mongoose.model("Chat",chatschema)

export default ChatModel