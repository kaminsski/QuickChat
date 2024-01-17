const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require("validator");


const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"30d"})
}

const getUser= async(req,res)=>{
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        res.json({user:user})
    } catch (error) {
        console.log(error);
    }
}

const getAllUser=async (req,res)=>{
    try {
        const users = await User.find()
        res.json({users:users})
    } catch (error) {
        console.log(error);
    }
}


const updateUser = async(req,res)=>{
    try {
        const {username, email, password}= req.body
        const userId = req.params.id

        let photo = "";
        if (req.file) {
            photo = req.file.path;
          }
        const hashed = await bcrypt.hash(password, 10);
        
        const user = {
            username,
            email,
            password:hashed,
            photo
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            user,
            {new: true}
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        console.log(updatedUser);
        res.status(200).json({
            email:updatedUser.email,
            photo:updatedUser.photo,
            username:updatedUser.username,
            token: createToken(updatedUser._id),
            _id:updatedUser._id,
        })


    } catch (error) {
        
    }
}

const registerUser= async(req,res)=>{
    try {
        const {username, email, password}= req.body
        // Validate username
      if (!validator.isLength(username, { min: 3 })) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long' });
      }
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
      }
  
      // Validate password
      if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
        let photo = "";

        if (req.file) {
            photo = req.file.path;
          }
        if(!username || !email || !password){
            res.json({message:"Form is invalid"})
        }
        const user = await User.findOne({username})

        if(user){
            res.json({message:"This email is already registered"})

        }
        const hashed = await bcrypt.hash(password, 10);

        const newUser= await User.create({
            username,
            email,
            password:hashed,
            photo
        })
        if(newUser){
            res.json({
                _id:newUser.id,
                username:newUser.username,
                email:newUser.email,
                token: createToken(newUser._id),
                photo: photo  
            })
        }

    } catch (error) {
        console.log(error)
    }
}
const loginUser= async (req,res)=>{
    try {
    const {username,password} = req.body
    const user = await User.findOne({username})

    if(!user){
        return res.json({message:"User not found"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        return res.json({message:"Password not match"});
        ;
    }

    if(user){
        res.json({
            _id:user.id,
            username:user.username,
            email:user.email,
            token: createToken(user._id),
            photo: user.photo
        })
    }

    
    } catch (error) {
        console.log(error);
    }
}
module.exports={getUser, getAllUser, registerUser, loginUser, updateUser}