import usermodel from "../Models/UserModel.js";

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
// get a user



// get all users

export const getAllUsers=async(req,res)=>{
    try {
        let users=await usermodel.find()
        users=users.map((user)=>{
            const {password,...otherDetails}=user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const getuser=async(req,res)=>{
    const id=req.params.id


    try {
        const user=await usermodel.findById(id)

        if(user){
            const {password,...otherDetails}=user._doc
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No user exist")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}


// updating a user


export const updateuser=async(req,res)=>{
    const id=req.params.id
    const {_id,currentuserAdminstatus,password}=req.body

    if(id===_id) {
        try {

            if(password){
                const salt=await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(password,salt)
            }
            const user=await usermodel.findByIdAndUpdate(id,req.body,{new:true})
            const token=jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,{expiresIn:"1h"}
            )
            res.status(200).json({user,token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Acess Denied !")
    }
}


// delete user


export const deleteuser=async(req,res)=>{
    const id=req.params.id
    const {currentuserid,currentuserAdminstatus}=req.body
    if(currentuserid===id ||currentuserAdminstatus){
        try {
            await usermodel.findByIdAndDelete(id)
            res.status(200).json("user deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Only delete your profile")
    }

}


// follow a user

export const followuser=async (req,res)=>{
    const id=req.params.id
    const {_id}=req.body
    if(_id===id){
        res.status(403).json("Action forbidden")
    }

    else{
        try {
            const followuser= await usermodel.findById(id)
            const followinguser=await usermodel.findById(_id)
            if(!followuser.followers.includes(_id)){

                await followuser.updateOne({$push:{followers:_id}})
                await followinguser.updateOne({$push:{following:id}})
                res.status(200).json("user followed")
            }
            else{
                res.status(403).json("user already followed")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export const unfollowuser=async (req,res)=>{
    const id=req.params.id
    const {_id}=req.body
    if(_id===id){
        res.status(403).json("Action forbidden")
    }

    else{
        try { 
            const followuser= await usermodel.findById(id)
            const followinguser=await usermodel.findById(_id)
            if(followuser.followers.includes(_id)){

                await followuser.updateOne({$pull:{followers:_id}})
                await followinguser.updateOne({$pull:{following:id}})
                res.status(200).json("user unfollowed")
            }
            else{
                res.status(403).json("user already unfollowed")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}