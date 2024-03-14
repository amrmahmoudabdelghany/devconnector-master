import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {  
    posts :[] , 
    post : null ,
    loading : true , 
    error : {} 
} ; 
 
export const getPostsAction = createAsyncThunk("post/get" , async (userData = null , {rejectWithValue})=>{ 
 try { 
   return  (await axios.get("/api/posts")).data ; 
 }catch(err) { 
   return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ; 
 }
}) ; 

export const addPostLikeAction = createAsyncThunk("post/like/add" , async ({postId} , {rejectWithValue})=>{ 
  try { 
    const res =   (await axios.put(`/api/posts/like/${postId}`)).data ;  
    return {postId , likes : res} ; 
  }catch(err) { 
   return  rejectWithValue({msg : err.response.statusText , status : err.response.status}) ; 
  }
}) ;

export const removePostLikeAction = createAsyncThunk("post/unlike/remove" , async ({postId} , {rejectWithValue})=>{ 
  try { 
    const res =   (await axios.put(`/api/posts/unlike/${postId}`)).data ;   
    return {postId , likes : res} ; 
  }catch(err) {  
    
   return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ; 
  }
}) ;
 
export const deletePostAction = createAsyncThunk("post/delete" , async ({postId} , {rejectWithValue})=> {
  try { 
     const res =   (await axios.delete(`/api/posts/${postId}`)).data ;  
       return {postId , msg : res} ;
    }catch(err) { 
    return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ; 
  }
}) ; 

export const addPostAction = createAsyncThunk("post/add" , async ({userData} , {rejectWithValue})=>{ 
  try {  
    const config  = { 
      headers : { 
        'Content-Type' : 'application/json'
      }
    } ; 
    
    console.log(userData) ;
    return  (await axios.post(`/api/posts` , {text : userData} , config)).data ;  
  } catch(err) { 
    return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ;   
  }
}) 
export const fetchPostByIdAction = createAsyncThunk("post/getById" , async({postId} , {rejectWithValue})=>{
     try { 
      return  (await axios.get(`/api/posts/${postId}`)).data ; 
     }catch(err){ 
      return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ;  
     }
})

export const addCommentAction = createAsyncThunk("post/comment/add" , async ({postId , text} , {rejectWithValue})=>{ 
 
  try { 
     const config  = { 
      headers : { 
        'Content-Type' : 'application/json'
      }
     } ; 
     
    const res =  (await axios.post(`/api/posts/comment/${postId}` , {text} , config) ).data ; 
     return { postId , comments : res} ; 
  }catch(err){ 
    return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ;  
  }

}) ; 

export const deleteCommentAction = createAsyncThunk("post/comment/delete" , async({postId , commentId} , {rejectWithValue}) =>{ 
  try { 
     const res = (await axios.delete(`/api/posts/comment/${postId}/${commentId}`)) ; 
     return {postId , commentId , msg:res.msg} ;  
  }catch(err) { 
    return rejectWithValue({msg : err.response.statusText , status : err.response.status}) ;     
  }
})

const postSlice  = createSlice( { 
    name :"post" , 
    initialState , 
    reducers : {} , 
    extraReducers : (builder)=> {
        builder.addCase(getPostsAction.pending , (state , action)=>{ 
            state.loading = true ; 
            state.posts  = [] ; 
            state.error = {} ; 
        })  
        .addCase(getPostsAction.fulfilled , (state , action)=> {
            state.posts = action.payload ; 
            state.loading = false ;
        }) 
        .addCase(getPostsAction.rejected , (state , action)=>{ 
             state.posts = [] ; 
             state.error = action.payload ; 
             state.loading =false ;
        }) 
        .addCase(addPostLikeAction.pending , (state, action)=>{ 
          state.loading = true ; 
          state.error = {} ; 
        }) 
        .addCase(addPostLikeAction.rejected , (state , action)=> { 
          state.posts = [] ; 
          state.error = action.payload ; 
          state.loading =false ; 
        })
        .addCase(addPostLikeAction.fulfilled , (state , action)=>{ 
          state.loading = false ; 
          state.error = {} 
          const index = state.posts.findIndex(post => post._id === action.payload.postId) ;  
          state.posts[index].likes = action.payload.likes ; 
        }) 
        .addCase(removePostLikeAction.pending , (state , action)=> {
          state.loading = true ; 
          state.error = {} ; 

        }) 
        .addCase(removePostLikeAction.rejected , (state , action)=>{ 
          state.loading = false ; 
          state.error = action.payload ;  
           

        })
        .addCase(removePostLikeAction.fulfilled , (state , action)=>{ 
          state.loading = false ; 
          state.error = {} ; 
          const index = state.posts.findIndex(post => post._id === action.payload.postId) ;  
          state.posts[index].likes = action.payload.likes ; 
          
        }) 
       .addCase(deletePostAction.pending , (state , action)=>{ 
         state.loading = true ; 
         state.error = {} ; 
       }) 
       .addCase(deletePostAction.fulfilled , (state , action)=>{ 
         state.loading = false ; 
         state.error = {} ; 
         state.posts = state.posts.filter(post=>post._id !== action.payload.postId) ; 
       }) 
       .addCase(deletePostAction.rejected , (state , action)=>{ 
        state.loading = false ; 
        state.error = action.payload ; 
       }) 
       .addCase(addPostAction.pending , (state , action)=> {
        state.loading = true ; 
        state.error = {} ;
       })
       .addCase(addPostAction.rejected , (state , action)=>{ 
        state.loading = false ; 
        state.error = action.error ; 
       }) 
       .addCase(addPostAction.fulfilled , (state , action)=>{ 
        state.loading = false ; 
        state.error = {} ; 
        state.posts.unshift(action.payload) ; 
       }) 
       .addCase(fetchPostByIdAction.pending , (state , action)=>{ 
        state.loading = true ; 
        state.error = {} ; 
        state.post = null  ;
       })  
       .addCase(fetchPostByIdAction.rejected , (state , action)=> { 
        state.loading = false ; 
        state.error = action.payload ; 
        state.post = null ; 
       })
       .addCase(fetchPostByIdAction.fulfilled , (state , action)=>{ 
        state.loading = false ; 
        state.error = {} ; 
        state.post = action.payload ; 
       }) 
       .addCase(addCommentAction.pending , (state , action)=>{ 
        state.loading = true ; 
        state.error = {} ;
       }) 
       .addCase(addCommentAction.fulfilled , (state , action)=> { 
        state.loading = false ;
        state.error = {} ; 
        state.post.comments = action.payload.comments ; 
        
        })
        .addCase(addCommentAction.rejected , (state , action)=>{ 
           state.loading  = false ; 
           state.error = action.payload ; 
        }) 
        .addCase(deleteCommentAction.pending , (state , action)=>{ 
          state.loading = true ; 
          state.error = {} ; 
        }) 
        .addCase(deleteCommentAction.fulfilled , (state , action)=>{ 
          state.loading = false ; 
          state.error = {} ; 
          state.post.comments = state.post.comments.filter(comment => comment._id !== action.payload.commentId ) ; 

        })
    }
})  ; 
export default postSlice.reducer ; 