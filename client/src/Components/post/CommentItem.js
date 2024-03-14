import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const CommentItem = ({postId , comment : { _id, name , text ,avatar  , user , date} , deleteComment}) => { 
    const auth = useAuth() ;
  return (
    <div class="post bg-white p-1 my-1">
    <div>
      <Link to ={`/profile/${user}`}>
        <img
          class="round-img"
          src={avatar}
          alt="user-avatar"
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class="my-1">
       {text}
      </p>
       <p class="post-date">
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p> 
       {
        auth.user._id === user && <button  className =" btn btn-danger" onClick={(e)=>deleteComment(postId ,_id )}> 
        <i className="fas fa-times"></i> 
            {' '}
            Delete
        </button> 
       }
    </div>
    </div>
  )
}

export default CommentItem
