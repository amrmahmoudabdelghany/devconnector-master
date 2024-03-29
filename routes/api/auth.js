const express = require('express') ; 
const router = express.Router() ; 
const { check, validationResult } = require('express-validator');
const auth = require("../../middleware/auth") ; 
const User = require('../../models/User'); 
const gravatar = require("gravatar") ; 
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken") ;
const config = require("config") ; 

// @route  Get api/auth
// @desc   Test route
// @access Public 
router.get('/' ,auth ,async  (req , res)=>{

    try { 
        console.log("On user loaded : " + req.user.id) ; 
        const user = await User.findById(req.user.id).select("-password") ;
         return res.json(user) ; 
    }catch(err) { 
        console.log(err.message) ;
        res.status(500).send("Server error") ; 
    }
}) ; 


// @route  POST api/auth
// @desc   Authenticate user and get token 
// @access Public 
router.post('/' , [ 
    check("email" , "Please include a valid email")
    .isEmail() , 
    check("password" , "Password is required").not().isEmpty()  
], async (req , res)=>{
    const  errors = validationResult(req) ; 
    if(!errors.isEmpty()) { 
        return res.status(400).json({errors : errors.array()}) ; 
    }
 

    try { 
         const { email , password} = req.body ;

        let user = await User.findOne({email}).select(); 
          
        if(!user) { 
           return  res.status(400).json({errors : [{msg : "Invalid Credentials"}]}) ; 
        }

        const isMatch = await bcrypt.compare(password , user.password) ;  



        if(!isMatch) { 
            return  res.status(400).json({errors : [{msg : "Invalid Credentials"}]}) ; 
        }

        const payload = {
            user:{ 
                id : user.id 
            }
        };

        jwt.sign(payload ,
         config.get("jwtSecret") , 
         {expiresIn:360000} , (err , token)=>{ 
            if(err) throw err ; 
            return  res.json({token}) ;
         }); 
     
    }catch(error) { 
        console.error(error.message) ;
        res.status(500).send("Server error") ; 
    }

}) ; 

module.exports = router ; 
