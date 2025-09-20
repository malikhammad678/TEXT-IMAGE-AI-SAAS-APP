import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectedRoute = async (req,res,next) => {
    try {
        const { token } = req.headers;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Un-authorized"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(400).json({
                success:false,
                message:"Un-authorized"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");
        req.user = user;
        next()
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}