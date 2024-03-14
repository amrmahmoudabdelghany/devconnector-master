import { useDispatch, useSelector } from "react-redux";
import { addCommentAction, addPostAction, addPostLikeAction, deleteCommentAction, deletePostAction, fetchPostByIdAction, getPostsAction, removePostLikeAction } from "../features/postSlice";
import useAlertService from "./useAlertService";

  
 export default ()=>{ 
  

    const posts = useSelector(state=>state.post.posts) ;
    const dispatch = useDispatch() ;
    const isLoading = useSelector(state=>state.post.loading) ; 
    const {showAlert}  = useAlertService() ; 
     const post = useSelector(state=>state.post.post) ; 
    const fetchAllPosts = ()=>{ 
            dispatch(getPostsAction()); 
    } ; 

    const addPostLike = (postId)=>{ 
        dispatch(addPostLikeAction({postId})) ; 
    }

    const removePostLike = (postId)=>{ 
        dispatch(removePostLikeAction({postId})) ; 
    } 
    const deletePost  = (postId)=> {
        dispatch(deletePostAction({postId})) ; 
        showAlert("Post Removed" , "success") ; 
    }
        
    const addPost = (post)=> {
        dispatch(addPostAction({userData : post})).then(()=>{ 

                showAlert("Post Added " , "success") ; 
        });
    }
    const getPostById = (postId)=>{ 
        dispatch(fetchPostByIdAction({postId})); 
    } 
    const getCurrentPost = ()=>{ 
        return post ; 
    }

    const addComment = (postId , text )=>{ 
        dispatch(addCommentAction({postId , text})).then(()=>{ 

                showAlert("Comment Added") ; 
        }) ; 
    } 
    const  deleteComment = (postId , commentId)=>{ 
        dispatch(deleteCommentAction({postId , commentId})).then(()=>{ 
                showAlert("Comment Removed") ; 
        })
    }

    return {fetchAllPosts , posts ,
         isLoading ,
          addPostLike , 
          removePostLike ,
           deletePost ,
            addPost ,
             getPostById ,
              getCurrentPost  ,  
              addComment , 
              deleteComment
        } ;  
 }