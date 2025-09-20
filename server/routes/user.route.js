import express from 'express'
import { getUser, login, signup, userCredits } from '../controllers/user.controller.js'
import { protectedRoute } from '../utils/protectedRoute.js'

const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/credits", protectedRoute , userCredits)
userRouter.get("/me", protectedRoute, getUser)

export default userRouter;