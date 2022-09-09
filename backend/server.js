const express = require('express')
const dotenv = require('dotenv').config()
const router = require('./routes/userRoutes')

const port = process.env.PORT
const app = express()

// app.post('/',(req,res) => {"user registration"})
app.use( router)

app.listen(port)

// app.get('/', (req,res)=> {
//     res.send("user registration")
// } )

// app.get('/',(req,res)=> res.json({"user":"abel"}))