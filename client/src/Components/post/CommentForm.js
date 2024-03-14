 


 import React, { useState } from 'react'
 
 const CommentForm = ({postId , addComment}) => { 
    const [text , setText] = useState("") ; 

   return (
    <div className="post-form">
    <div className="bg-primary p">
      <h3>Leave A Comment</h3>
    </div>
    <form className="form my-1" onSubmit={(e)=>{e.preventDefault() ; addComment(postId , text) }}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Comment on this post"
        required 
        value = {text} 
        onChange={(e)=>setText(e.target.value)}
      ></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  </div>
   )
 }
 
 export default CommentForm
 