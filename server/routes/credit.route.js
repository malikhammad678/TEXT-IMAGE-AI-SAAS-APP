import express from 'express'
import { getAllPlans, purchasePlan } from '../controllers/credit.controller.js'
import { protectedRoute } from '../utils/protectedRoute.js'

const creditRouter = express.Router()

creditRouter.get("/", getAllPlans)
creditRouter.post("/purchase", protectedRoute, purchasePlan)

export default creditRouter;