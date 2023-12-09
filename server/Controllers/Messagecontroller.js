


import MessageModel from '../Models/MessageModel.js'



export const addmessage=async(req,res)=>{
    const {chatid,senderid,text}=req.body
    const message=new MessageModel({
        chatid,
        senderid,
        text
    })
    try {
        const result=await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getmessage=async(req,res)=>{
    const {chatid}=req.params
    try {
        const result=await MessageModel.find({chatid})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}