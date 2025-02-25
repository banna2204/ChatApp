import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import createToken from "../jwt/genToken.js";

export const signup = async(req,res)=>{
  const {name,email,password,confirmpassword} = req.body;
    try {
    if(password !== confirmpassword){
      return res.status(400).json({error:'Passwords do not match!!'})
    }
    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({error:'email already exists!!'})
    }

    const hasedpass = await bcrypt.hash(password,10);
    const newUser = await new User({
      name,
      email,
      password:hasedpass,
    });
    await newUser.save();
    if(newUser){
      createToken(newUser._id,res);
      res.status(201).json({
        message:'User registered successfully',
        user:{
          _id:newUser._id,
          name:newUser.name,
          email:newUser.email,
        }
      });
    }
    } catch (error) {
      res.status(500).json({error:'Server error!!'});
    }
}

export const login = async(req,res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createToken(user._id,res);
    res.status(201).json({message:'User login successfully',
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
      },
    });
  } catch (error) {
    res.status(500).json({error:'Server error!!'});
  }
}

export const logout = async(req,res)=> {
  try {
    res.clearCookie('jwt');
    res.status(200).json({message:'User logout successfully!'})
  } catch (error) {
    res.status(500).json({error:'Server error!!'}); 
  }
}


export const allusers = async(req,res)=>{
    try {
      const logedId = req.user._id;
      const allUser = await User.find({_id:{$ne:logedId},}).select('-password')
      res.status(201).json(allUser);

    } catch (error) {
      console.log(error);
      res.status(500).json({message:'Server error'});
    }
}