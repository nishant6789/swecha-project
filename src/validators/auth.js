const { check,body, validationResult } = require('express-validator');


exports.validateSignupRequest=[
   check("firstName").notEmpty().withMessage("First Name is required"),
   //check("userName").notEmpty().withMessage("User Name is required"),
   check("email").notEmpty().withMessage("Email is required"),
   check("email").isEmail().withMessage("Valid Email is required"),
   check("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
 ];

   exports.validateSigninRequest=[
    check("email").notEmpty().withMessage("Email is required"),
      check("email").isEmail().withMessage("Valid Email is required"),
      check("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")];

exports.isRequestValidated=function(req,res,next){
  const err=validationResult(req);
  if(err.array().length>0){
    return res.status(400).json({errors:err.array()[0].msg});
  }
  next();
}
