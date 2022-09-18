const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')

const userRegister = asyncHandler(
    async (req,res) => { 
        const {name, email, pass} = req.body
        if(!name || !email || !pass){
            res.status(400)
            throw new Error('please fill all the required fields')
        }
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error('This email address has been registered')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(pass,salt)

        const user = await User.create({
            name,
            email,
            password: hashedPass
        })

        if(user){
            console.log(user)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token : generateToken(user._id)
            })   
        }else {
            res.status(400)
            throw new Error('invalid input')
        }
    } 
)

const login = asyncHandler(
    async (req,res) => {
        const {pass,email} = req.body

        if(!pass || !email){
            res.status(400)
            throw new Error('fill the required fields')
        }

        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(pass, user.password)) ){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token : generateToken(user._id)
            })
        }else {
            res.status(401)
            throw new Error('invalid user')
        }
    }
)

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}
const getUser = asyncHandler(
    async (req,res) => {
        const user = {
            name: req.user.name,
            email: req.user.email,
            id: req.user._id
        }
        res.status(200).json(user)
    }
)

module.exports = {userRegister,login, getUser }