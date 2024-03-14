import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAccActions from '../../hooks/useAccActions';

const AddEducation = () => { 

    const {addEducation}  = useAccActions() ; 
 
  const [formData , setFormData] = useState({
    school : '' , 
    degree : '' , 
    fieldofstudy : ''  ,
    from  : '', 
    to  : '', 
    current : '' , 
    description : '' 
  }) ; 
  const { 
      school , 
      degree , 
      fieldofstudy , 
      from ,
      to , 
      current, 
      description    
  } = formData ; 

  const change = (e)=> { 
    setFormData({...formData , [e.target.name] : e.target.value}) ;
  }  ; 
  const submit = (e)=>{ 
     e.preventDefault() ; 
    addEducation(formData) ; 
  }
 
  return (
    <> 
       <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required 
            value={school} 
            onChange={change}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree} 
            onChange={change}
          />
        </div>
        <div className="form-group">
          <input type="text" 
           placeholder="Field Of Study" 
            name="fieldofstudy" 
            value={fieldofstudy} 
            onChange={change} 
            />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  
           value={from} 
           onChange={change} 
           />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox"
             name="current" 
             checked = {current}
              value={current} 
               onChange={(e)=>{ 
                setFormData({...formData , current : !current})
               }}
              /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date"
           name="to" 
           value={to} 
           onChange={change} 
           disabled={current} 
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description" 
            value={description} 
            onChange={change} 
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
      </form>
   
    
    </>
  )
}

export default AddEducation
