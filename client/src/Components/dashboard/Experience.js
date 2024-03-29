import React from 'react'
import Moment from 'react-moment' ; 

const Experience = ({experience ,deleteExperience }) => { 

    const experiances = experience.map((exp)=>
        <tr key = {exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment>- 
            {exp.to=== null ? (
                ' Now') : (<Moment format='YYYY/MM/DD' >{exp.to}</Moment>) 
            }
       
        </td>
        <td>
          <button className="btn btn-danger" onClick={(e)=>deleteExperience(exp._id)}>
            Delete
          </button>
        </td>
      </tr>) 
  return (
    <> 
    
    <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiances}
        </tbody>
      </table>

    </>
  )
}

export default Experience
