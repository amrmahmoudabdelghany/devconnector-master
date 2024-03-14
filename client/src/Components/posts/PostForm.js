import React, { useState } from 'react'
import usePostFeature from '../../hooks/usePostFeature';

const PostForm = ({addPost}) => { 
    const [text , setText] = useState('') ; 
     
  return (
    <div className="post-form">
    <div className="bg-primary p">
      <h3>Say Something...</h3>
    </div>
    <form className="form my-1" onSubmit={(e)=>addPost(text)} >
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Create a post"
        required
        value = {text} 
        onChange={(e)=>setText(e.target.value)}
      ></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  </div>
  )
}

export default PostForm
