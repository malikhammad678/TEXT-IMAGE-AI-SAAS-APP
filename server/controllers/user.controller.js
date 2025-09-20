import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try {
        const { name, email,password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please fill in all the fields!"
            })
        }
        const ExistingUser = await User.findOne({ email })
        if(ExistingUser){
           return res.status(400).json({
                success:false,
                message:"User Already Exist!"
            }) 
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = await generateToken(user._id)

        res.status(201).json({
            success:true,
            user,
            token,
            message:"User Created Successfuly!"
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
         return res.status(400).json({
                success:false,
                message:"Please fill in all the fields!"
        })   
        }
        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const isMatchedPassword = await bcrypt.compare(password, user.password)
        if(!isMatchedPassword){
            return res.status(404).json({
                success:false,
                message:"Invalid Credentials"
            }) 
        }
        const token = await generateToken(user._id)
        res.status(200).json({
            success:true,
            message:"User LoggedIn Successfuly!",
            token,
            user
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
        })
}
}

export const userCredits = async (req,res) => {
    try {
        const userId  = req.user._id
        const user = await User.findById(userId)
        res.status(200).json({
            success:true,
            credits:user.credits,
            user:{
                name:user.name
            }
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getUser = async (req,res) => {
    try {
        res.status(200).json({
            success:true,
            user:req.user
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}