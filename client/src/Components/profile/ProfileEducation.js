import React from 'react'
import Moment from 'react-moment'

const ProfileEducation = ({education:{school , degree , fieldofstudy ,from , to ,  description , current}}) => {
  return ( 
    <div>
      <h3>{school}</h3>
      <p><Moment format='YYYY/MM/DD'>{from}</Moment> {!to ? 'Now ' : <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>
      <p><strong>Degree: </strong>{degree && <span>{degree}</span>}</p>
      <p><strong>Field Of Study: </strong>{fieldofstudy && <span>{fieldofstudy}</span>}</p>
      <p>
        <strong>Description: </strong>{description && <span>description</span>}
      </p>
    </div>
  
  )
}

export default ProfileEducation
