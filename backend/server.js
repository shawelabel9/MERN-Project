const { urlencoded } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const router = require('./routes/userRoutes')
const connectDB = require('./config/db')
const {errorHandler} =require('./MiddleWare/errorMiddleWare')


const port = process.env.PORT
const app = express()

connectDB()
app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(errorHandler)

app.use( '/api/users',router)    

app.listen(port,console.log("server is listening to port 5000"))
