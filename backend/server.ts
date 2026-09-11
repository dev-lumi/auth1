import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoute from './routes/authRoutes'
import connectDB from './config/db'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoute)

app.get('/', (req,res)=>{res.json({message: "Api is running."})})

const PORT = process.env.PORT || 4000


app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})