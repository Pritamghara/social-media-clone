import PostModel from "../Models/PostModel.js";
import usermodel from '../Models/UserModel.js'

import mongoose from "mongoose";


// create new post

export const createpost=async(req,res)=>{
    const newPost=new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }


}

// get a post

export const getpost=async(req,res)=>{
    const id=req.params.id
    try {
        const post=await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

// update post

export const updatepost=async(req,res)=>{
    const postid=req.params.id
    const {userid}=req.body
    try {
        const post=await PostModel.findById(postid)

        if(post.userid===userid){
            await post.updateOne({$set:req.body})
            res.status(200).json("post updated")
        }
        else{
            res.status(403).json("action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
// deleta a post


export const deletepost=async(req,res)=>{
    const id=req.params.id
    const {userid}=req.body
    try {
        const post =await PostModel.findById(id)
        if(post.userid===userid){
                await post.deleteOne()
                res.status(200).json("post deleted sucess")
        }
        else{
            res.status(403).json("action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

// like /dislike

export const likepost=async(req,res)=>{
    const id=req.params.id
    const {userid}=req.body
    try {
        const post= await PostModel.findById(id)
        if(!post.likes.includes(userid)){
            await post.updateOne({$push:{likes:userid}})
            res.status(200).json("post liked ")

        }
        else{
            await post.updateOne({$pull:{likes:userid}})
            res.status(200).json("post unliked ")

        }

    } catch (error) {
        res.status(500).json(error)
    }

}

// get timelinepost

export const gettimelinepost=async(req,res)=>{
    const userid=req.params.id

    try {

        const currentuserposts=await PostModel.find({userid :userid})
        
        const followingpost=await usermodel.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(userid)
                },
               
            },
            {
                $lookup:{
                    from :"posts",
                    localField:"following",
                    foreignField:"userid",
                    as:"followingpost"
                },
                
            },
            {
                $project:{
                    followingpost:1,
                    _id:0,
                }
            }
        ])
        const allPosts = currentuserposts.concat(...followingpost[0].followingpost);
        const sortedPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(sortedPosts);

        
    } catch (error) {
        res.status(500).json(error)
    }

}

