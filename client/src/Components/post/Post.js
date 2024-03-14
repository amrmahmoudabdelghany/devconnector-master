
 
 import React, { useEffect } from 'react'
import usePostFeature from '../../hooks/usePostFeature';
import { useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
 
 const Post = () => { 
    const {postId} = useParams() ; 
    const {getPostById , getCurrentPost ,isLoading , addComment , deleteComment} = usePostFeature() ;
    const post = getCurrentPost() ;  
  console.log(deleteComment) ; 
    useEffect(()=>{ 
        getPostById(postId) ;
    } , []) ; 

   return  post !== null && !isLoading ?  ( 
    <>
   <PostItem post = { post} showPostAction = {false} />
     <CommentForm postId = {postId} addComment = {addComment}  />  
     <div className="comments"> 
      {
        post.comments.map((comment)=><CommentItem key = {comment._id} postId = {postId} comment= {comment} deleteComment={deleteComment}/>) 
       }
      </div>
     </>
   ) : <Spinner/>
 }
 
 export default Post
 