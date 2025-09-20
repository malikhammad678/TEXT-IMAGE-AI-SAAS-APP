import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        default:10
    }
},{timestamps:true})

const User  = mongoose.models.User || mongoose.model('User', userSchema)

export default User;