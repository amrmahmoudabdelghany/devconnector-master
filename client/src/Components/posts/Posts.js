import React, { useEffect } from 'react'
import usePostFeature from '../../hooks/usePostFeature'
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';

const Posts = () => { 

    const {posts , fetchAllPosts , isLoading , addPost} = usePostFeature() ; 

    useEffect(()=>{ 
         fetchAllPosts() ; 
         console.log("On Posts Loaded") ; 
    } , [])

   
  return (
     isLoading === true ? (<Spinner/>) :  ( <>
       <h1 className='large text-primary' >Posts</h1> 
      <p className = 'lead'> 
        <i className='fas fa-user'></i> Welcome to the community 
       </p>
       <PostForm addPost = {addPost}/>
         <div className = "posts"> 
        
           {
            posts.map((post)=>(
              <PostItem key = {post._id} post = {post} />
            ))
           }
         </div>
      
      </>)
    
    
  )
}

export default Posts
