const express = require('express') ;  
const request = require("request") ; 
const config = require("config") ;
const router = express.Router() ; 
const auth  = require("../../middleware/auth") ; 
const Profile = require("../../models/Profile") ; 
const User = require("../../models/User") ; 
const Post = require("../../models/Post") ; 

const { check , validationResult } = require('express-validator');

// @route  Get api/profile/me
// @desc   Get the current profile for this user 
// @access private 
router.get('/me' ,auth ,  async (req , res)=> {
    try { 
 
        const profile = await Profile.findOne({user : req.user.id}).populate('user' , ["name" , "avatar"]); 
 
        if(!profile) { 
            return res.status(400).json({msg : "There is no profile for this user"}) ; 
        }
 
        return res.json(profile); 
    }catch(err) { 
        console.log(err.message) ; 
       return  res.status(500).send("Server Error ") ;
    }
}) ; 


// @route  Get api/profile
// @desc   Get the current profile for this user 
// @access private 
router.post("/" , 
[auth ,
     [
    check("status" , "Status is required").not().isEmpty()  , 
    check("skills" , "Skills is required").not().isEmpty() , 

]] , async (req , res )=>{ 
  
    console.log("RequestBody : " + JSON.stringify(req.body)) ; 
    const errors = validationResult(req) ; 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()}) ; 
    }
     const {
        company , 
        website , 
        location , 
        bio , 
        status , 
        githubusername , 
         skills ,
        youtube , 
        twitter ,
        facebook ,
        instagram , 
        linkedin 
        } = req.body ; 

        
        const profileFields = {} ; 
        const id  = req.user.id ;  
        profileFields.user = id ; 
        if(company) profileFields.company = company ; 
        if(website) profileFields.website = website ; 
        if(location) profileFields.location = location ; 
        if(bio) profileFields.bio = bio ; 
        if(status) profileFields.status = status ; 
        if(githubusername) profileFields.githubusername = githubusername ; 
        if(skills) { 
            profileFields.skills = skills.split(',').map(skill=>skill.trim()) ; 
        
        }  

        profileFields.social = {} ; 

        if(youtube) profileFields.social.youtube = youtube ; 
        if(twitter) profileFields.social.twitter = twitter ; 
        if(facebook) profileFields.social.facebook = facebook ; 
        if(instagram) profileFields.social.instagram = instagram ; 
        if(linkedin) profileFields.social.linkedin = linkedin ; 
 



         
    try { 
        let profile = await Profile.findOne({user : req.user.id}) ; 
        
        if(profile) { 
             profile = await Profile.findOneAndUpdate({user : req.user.id} , {$set:profileFields} , {new : true}) ;
            return res.json(profile) ;
        } 
    
        profile = new Profile(profileFields) ;
        await profile.save() ; 
        return   res.json(profile) ;
    }catch(err) { 
        console.log(err.message) ;
        res.status(500).send("Server error") ;

    }


}) ;
// @route  Get api/profile
// @desc   Get all profiles  
// @access public
router.get("/" , async (req ,res)=>{ 
    
    try {
    const profiles  = await Profile.find().populate("user" , ["name" , "avatar"] ) ;
    res.json(profiles) ; 

    } catch(err) { 
        console.log(err.message) ;
        res.status(500).send("Server error") ;
    } 

}) ; 

// @route  Get api/profile/user/:user_id
// @desc   Get profile for a spacific user 
// @access public
router.get("/user/:user_id" , async (req ,res)=>{ 
    
    try {
    const targetId = req.params.user_id  ;

    const profile = await Profile.findOne({user : targetId }).populate("user" , ["name" , "avatar"] ) ; 
    if(!profile) { 
          
        return  res.status(400).json({msg : "Profile not found"}); 
    }
    
    res.json(profile) ; 
    
    } catch(err) { 
        console.log(err.message) ; 
        if(err.kind == "ObjectId") { 
            
            return  res.status(400).json({msg : "Profile not found"}); 
        }
        res.status(500).send("Server error") ;
    } 

}) ; 


// @route  DELETE api/profile
// @desc   DELET Account 
// @access private
router.delete("/" , auth , async (req ,res)=>{ 
    
    try {
    const targetId = req.user.id  ; 
    
    // delete user posts 
    await Post.deleteMany({user : targetId}) ; 
     
    // remove profile  
    await Profile.findOneAndDelete({user : targetId}) ;
 
    // remove user 
    await User.findOneAndDelete({_id : targetId}) ;


   return res.json({msg : "User Deleted "} ) ; 

    } catch(err) { 
        console.log(err.message) ; 
        if(err.kind == "ObjectId") { 
            
            return  res.status(400).json({msg : "Profile not found"}); 
        }
        res.status(500).send("Server error") ; 
        return ; 
    } 

}) ; 

// @route  PUT api/profile/experience
// @desc   PUT experience for a spacific profile 
// @access private
router.put("/experience" , [auth , [
    check("title" , "Title is required").not().isEmpty() ,
    check("company" , "Company is required").not().isEmpty() ,
    check("from" , "From date is required").not().isEmpty() ,
]] , async (req ,res)=>{ 
     
 const errors  = validationResult(req) ; 
  
 if(!errors.isEmpty()) { 
    return res.status(400).json({errors : errors.array()}) ; 
 } 
   
 const targetId = req.user.id ; 

 const { 
    title , 
    company , 
    location , 
    from , 
    to , 
    current ,
    description 
 } = req.body ; 
 
 const newExp = {  
    title , 
    company , 
    location , 
    from , 
    to ,
    current : current || false , 
    description 
 } ; 


    try { 
         const profile =  await Profile.findOne({user :targetId  }) ; 
        profile.experience.unshift(newExp) ;  

       await  profile.save() ;
       res.json(profile) ; 

     } catch(err) { 
        console.log(err.message) ; 
        res.status(500).send("Server error") ;
    } 

}) ; 

// @route  DELETE api/profile/experience/:exp_id
// @desc   DELETE experience for a spacific profile 
// @access private
router.delete("/experience/:exp_id" , auth , async (req , res)=>{ 
 try { 
    const profile = await Profile.findOne({user : req.user.id}) ; 
    const removeIndex =  profile.experience.map(item=>item.id).indexOf(req.params.exp_id) ;
  
    if(removeIndex > -1) { 
     profile.experience.splice(removeIndex , 1) ; 
     await profile.save() ; 
     return  res.json(profile) ; 
    }
    return res.status(400).json({msg : "Invalid Paramerters"}) ; 

 }catch(err) { 
   console.log(err.message) ; 
   res.status(500).send("Server Error") ; 
 }
}) ; 

// @route  PUT api/profile/education
// @desc   PUT education for a spacific profile 
// @access private
router.put("/education" , [auth , [
    check("school" , "School is required").not().isEmpty() ,
    check("degree" , "Degree is required").not().isEmpty() ,
    check("from" , "From date is required").not().isEmpty() ,
    check("fieldofstudy" , "Field of study is required").not().isEmpty() ,
]] , async (req ,res)=>{ 
     
 const errors  = validationResult(req) ; 
  
 if(!errors.isEmpty()) { 
    return res.status(400).json({errors : errors.array()}) ; 
 } 
   
 const targetId = req.user.id ; 

 const { 
    school , 
    degree , 
    fieldofstudy , 
    from , 
    to , 
    current ,
    description 
 } = req.body ; 
 
 const newEdu = {  
    school , 
    degree , 
    fieldofstudy, 
    from , 
    to ,
    current : current || false , 
    description 
 } ; 


    try { 
         const profile =  await Profile.findOne({user :targetId  }) ; 
        profile.education.unshift(newEdu) ;  

       await  profile.save() ;
       res.json(profile) ; 

     } catch(err) { 
        console.log(err.message) ; 
        res.status(500).send("Server error") ;
    } 

}) ; 

// @route  DELETE api/profile/education/:edu_id
// @desc   DELETE education for a spacific profile 
// @access private
router.delete("/education/:edu_id" , auth , async (req , res)=>{ 
 try { 
    const profile = await Profile.findOne({user : req.user.id}) ; 
    const removeIndex =  profile.education.map(item=>item.id).indexOf(req.params.edu_id) ;
  
    if(removeIndex > -1) { 
     profile.education.splice(removeIndex , 1) ; 
     await profile.save() ; 
     return  res.json(profile) ; 
    }
    return res.status(400).json({msg : "Invalid Paramerters"}) ; 

 }catch(err) { 
   console.log(err.message) ; 
   res.status(500).send("Server Error") ; 
 }
}) ; 


// @route  GET api/profile/github/:userName
// @desc   GET repositories for a spacific username  
// @access public
router.get("/github/:userName" , (req , res)=>{ 
 
    try { 
 
        const options = { 
            uri : `https://api.github.com/users/${req.params.userName}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}` , 
            method : "GET" , 
            headers : { 
                "user-agent" : "node.js"
            }
        } 
        request(options , (error , response , body)=> { 
           if(error) { 
            console.log(error) ; 
           }   
            
           console.log(response.statusCode) ; 

           if(response.statusCode !== 200) { 
            return  res.status(400).json({msg:"No github profile found"}) ; 
           }
          return  res.json(JSON.parse(body)) ; 

        }) ; 

 
    }catch(err) { 
        console.log(err.message) ;
        res.status(500).send("Server Error") ; 
    }
}) ; 


module.exports = router ; 
