const crypto = require("crypto");
const User = require('../models/User')
const ErrorResponse = require("../utlis/errorResponse")
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    // Check if email and password is provided
    if (!email || !password) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
  
    try {
      // Check that user exists by email
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
  
      // Check that password match
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
  
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };
  
  // @desc    Register user
  exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
  
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };

exports.forgotPassword = async (req,res,next)=>{
    const {email} = req.body;

    try {
      const user= await User.findOne({email});

      if(!user){
        return next (new ErrorResponse("Email could not be send", 404))
      }

      const resetToken = user.getResetPasswordToken();
      
      await user.save();

      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
    
      const message = `
      <h1> You have requested a password reset</h1>
      <p> Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking = off>${resetUrl}</a>
      `

      try {
        
      } catch (error) {
        
      }

      
    } catch (error) {
      
    }
};

exports.resetPassword = (req,res,next)=>{
    res.send('Reset password route')
    };

    const sendToken = (user, statusCode, res) => {
        const token = user.getSignedJwtToken();
        res.status(statusCode).json({ sucess: true, token });
      };