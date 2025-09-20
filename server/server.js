import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/DB.js'


const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req,res) => res.send('API Working...'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`App is listen on PORT: ${PORT}`)
})