import ChatModel from "../Models/ChatModel.js";


export const createchat=async(req,res)=>{
    const newChat=new ChatModel({
        members:[req.body.senderid,req.body.receiverid]
    });
    try {
        const result=await newChat.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userchats=async(req,res)=>{
    try {
        const chat=await ChatModel.find({
            members:{$in:[req.params.userid]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const findchat=async(req,res)=>{
    try {
        const chat=await ChatModel.findOne({
            members:{$all:[req.params.firstid,req.params.secondid]}

        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}