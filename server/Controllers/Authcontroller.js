import usermodel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
// registering new user
export const registeruser=async(req,res)=>{
    // const {username,password,firstname,lastname}=req.body;

    const salt=await bcrypt.genSalt(10)
    const hashedpass=await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedpass
    const newuser=new usermodel(req.body)
   
    const {username}=req.body
    try {
        const olduser=await usermodel.findOne({username})
        if(olduser){
            return res.status(400).json({message:"username is already registered"})
        }
        const user= await newuser.save()
        const token=jwt.sign({
            username:user.username,
            id:user._id},
            process.env.JWT_KEY,
            {expiresIn:'1h'}
            )
        res.status(200).json({user,token})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// login user

export const loginuser=async(req,res)=>{
    const{username,password}=req.body

    try {
       
        const user=await usermodel.findOne({username:username})

        if(user){
            const validity=await bcrypt.compare(password,user.password)

           if(!validity){
            res.status(400).json("wrong password")
           }
           else{
            const token=jwt.sign({
                username:user.username,
                id:user._id},
                process.env.JWT_KEY,
                {expiresIn:'1h'}
                )
                console.log(token)
            res.status(200).json({user,token})
           }
        }
        else{
            res.status(404).json("user not exist")
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}