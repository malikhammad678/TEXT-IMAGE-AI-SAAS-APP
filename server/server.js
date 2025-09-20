import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/DB.js'
import userRouter from './routes/user.route.js'
import imageRouter from './routes/image.route.js'


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req,res) => res.send('API Working...'))
app.use("/api/auth", userRouter)
app.use("/api/image", imageRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`App is listen on PORT: ${PORT}`)
})