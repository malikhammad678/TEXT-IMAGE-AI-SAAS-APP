import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/DB.js'
import userRouter from './routes/user.route.js'
import imageRouter from './routes/image.route.js'
import creditRouter from './routes/credit.route.js'
import { stripeWebhooks } from './controllers/webhooks.js'


const app = express()
app.post('/api/stripe', express.raw({ type:'application/json' }), stripeWebhooks)
app.use(cors())
app.use(express.json())

app.get("/", (req,res) => res.send('API Working...'))
app.use("/api/auth", userRouter)
app.use("/api/image", imageRouter)
app.use("/api/plans", creditRouter);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`App is listen on PORT: ${PORT}`)
})