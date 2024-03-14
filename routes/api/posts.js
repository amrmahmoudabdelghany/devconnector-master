const express = require('express') ; 
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router() ; 

// @route  POST api/posts
// @desc   Add a new post 
// @access private 
router.post('/' ,[auth , [ 
    check("text").not().isEmpty() , 
    
]] ,async  (req , res)=>{
    
    const errors = validationResult(req) ; 
    if(!errors.isEmpty()) { 
        return res.status(400).json({errors : errors.array()}) ; 
    }
    try { 

        const targetUser = req.user.id ; 

        const user = await User.findById(targetUser).select("-password") ; 


        const newPost = new Post( { 
            text : req.body.text  ,
            name : user.name  , 
            avatar : user.avatar , 
            user : targetUser 
        }) ; 
   
        const post = await newPost.save() ;  
        return res.json(post) ; 
    }catch(err) { 
        console.log(err.message) ;
        res.status(500).send("Server Error") ; 
    }

}) ; 

// @route  GET api/posts
// @desc   GET  all posts
// @access private 
router.get("/" , auth , async (req  , res)=>{ 
 try {
     
    const posts  = await Post.find().sort({date : -1}) ; 
    return  res.json(posts)  ; 
} catch (error) {
    console.log(error.message) ; 
    res.status(500).send("Server Error") ;     
 }
}) ;
// @route  GET api/posts/:postId
// @desc   GET  a spacific post by id 
// @access private 
router.get("/:postId" , auth , async (req  , res)=>{ 
 try {
     const postId = req.params.postId ; 
     const targetPost = await Post.findById(postId) ; 
      if(!targetPost) { 
       return res.status(404).json({msg : "Post not found"}) ;
      }
     return  res.json(targetPost)  ; 
} catch (error) {
    console.log(error.message) ; 
    if(error.kind === "ObjectId") { 
        return res.status(404).json({msg : "Post not found"}) ;
    }
    res.status(500).send("Server Error") ;     
 }
}) ;



// @route  DELETE api/posts/:postId
// @desc   DELETE  post by id 
// @access private 
router.delete("/:postId" , auth , async (req  , res)=>{ 
    try {
        
       const post  = await Post.findById(req.params.postId) ;  
        
       if(!post) { 
        return  res.status(404).json({msg : "Post not found"}) ; 
       }

       if(post.user.toString() !== req.user.id) { 
         return res.status(401).json({msg : "User not authorized"}) ;   
       }

       await Post.findOneAndDelete({_id : req.params.postId}) ; 
    
       return res.json({msg : "Post Deleted"}) ; 
       
   } catch (error) {
       console.log(error.message) ; 
      
       if(error.kind === "ObjectId") { 
          return res.status(404).json({msg : "Post not found"}) ;
       }
  
       res.status(500).send("Server Error") ;     
    }
   }) ;

// @route  PUT api/posts/like/:postId
// @desc   PUT  like on post by id 
// @access private 
router.put("/like/:postId" , auth , async (req  , res)=>{ 
    try {
        
       const post  = await Post.findById(req.params.postId) ;  
        
       if(!post) { 
        return  res.status(404).json({msg : "Post not found"}) ; 
       }

       if(post.likes.filter(like=>like.user.toString() === req.user.id ).length > 0){  
        return res.status(400).json({msg : "Post already liked"}) ; 
       }
       
       post.likes.unshift({user : req.user.id}) ;
        await post.save() ; 
       return res.json(post.likes) ; 
   } catch (error) {
       console.log(error.message) ; 
      
       if(error.kind === "ObjectId") { 
          return res.status(404).json({msg : "Post not found"}) ;
       }
  
       res.status(500).send("Server Error") ;     
    }
   }) ;

// @route  PUT api/posts/unlike/:postId
// @desc   PUT  unlike on post by id 
// @access private 
router.put("/unlike/:postId" , auth , async (req  , res)=>{ 
    try {
        
       const post  = await Post.findById(req.params.postId) ;  
        
       if(!post) { 
        return  res.status(404).json({msg : "Post not found"}) ; 
       }

       const postIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id) ; 

       if(postIndex === -1) { 
        return res.status(400).json({msg : "Post has not yet been liked"}) ; 
       }
 
       post.likes.splice(postIndex , 1) ; 

     //  if(post.likes.filter(like=>like.user.toString() === req.user.id ).length === 0){  
      //  return res.status(400).json({msg : "Post has not yet been liked"}) ; 
      // }
       
       //post.likes.unshift({user : req.user.id}) ;
        await post.save() ; 
       return res.json(post.likes) ; 
   } catch (error) {
       console.log(error.message) ; 
      
       if(error.kind === "ObjectId") { 
          return res.status(404).json({msg : "Post not found"}) ;
       }
  
       res.status(500).send("Server Error") ;     
    }
   }) ;


// @route  POST api/posts/comment
// @desc   Add a new comment to post 
// @access private 
router.post('/comment/:postId' ,[auth , [ 
    check("text").not().isEmpty() , 
    
]] ,async  (req , res)=>{
    
    const errors = validationResult(req) ; 
    if(!errors.isEmpty()) { 
        return res.status(400).json({errors : errors.array()}) ; 
    }
    try { 

        const targetUser = req.user.id ; 
        const targetPost = req.params.postId ; 

        const user = await User.findById(targetUser).select("-password") ; 
        const post = await Post.findById(targetPost).select() ; 

        const newComment =  { 
            text : req.body.text  ,
            name : user.name  , 
            avatar : user.avatar , 
            user : targetUser 
        } ; 

        post.comments.unshift(newComment) ; 

   
         await post.save() ;  
        return res.json(post.comments) ; 
    }catch(err) { 
        console.log(err.message) ;
        res.status(500).send("Server Error") ; 
    }

}) ; 


// @route  DELETE api/posts/comment/:postId/:commentId
// @desc   Add a new comment to post 
// @access private 
router.delete('/comment/:postId/:commentId' ,auth , async (req , res)=>{ 
 
    try {
 
        const targetPost  =  req.params.postId ; 
        const targetComment = req.params.commentId ; 

        const post = await Post.findById(targetPost) ; 
        
        if(!post) { 
            return res.status(404).json({msg : "Post not found"}) ; 
        }

        const commentIndex = post.comments.map(comment=>comment._id.toString()).indexOf(targetComment) ; 

        if(commentIndex === -1) { 
            return res.status(404).json({msg : "Comment not found"}) ; 
         } 
 
       const comment  = post.comments[commentIndex] ; 
         
       if(comment.user.toString() !== req.user.id) { 
        return res.status(401).json({msg : "User unauthorized to remove this comment"}) ; 
       } 

       post.comments.splice(commentIndex , 1) ; 

       await post.save() ; 
 
       return res.json({msg : "Comment has been deleted"}) ; 
       
    } catch (err) {
        console.log(err.message) ;

        if(err.kind === "ObjectId") { 
            return res.status(404).json({msg : "Post not found"}) ;      
        }

        res.status(500).send("Server Error") ;     
    }

}) ; 



module.exports = router ; 
