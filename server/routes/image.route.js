import express from 'express'
import { protectedRoute } from '../utils/protectedRoute.js'
import { generateImage } from '../controllers/image.controller.js'

const imageRouter = express.Router()

imageRouter.post("/generate-image", protectedRoute, generateImage)

export default imageRouter