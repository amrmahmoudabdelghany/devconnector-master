import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAccActions from '../../hooks/useAccActions';

const AddExperiance = () => { 
 
    const {addExperiance} = useAccActions() ;

    const [formData , setFormData] = useState({
         company : '' , 
         title : '' , 
         location :'' ,
         from : '' ,
         to : '' ,
         current : false ,
         description : ''  
    }) ; 
 
    const {
        company , 
        title , 
        location , 
        from , 
        to , 
        current , 
        description 
    } = formData ; 

    const change = (e) => { 
        setFormData({
            ...formData , 
            [e.target.name] : e.target.value 
        }) ;  
    }

const submit = (e)=>{ 
    e.preventDefault() ; 
    addExperiance(formData) ; 
}
  return (
    <>
   <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required  
          value = {title} onChange={change}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required  
          value = {company} onChange={change}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" 
          value = {location} onChange={change} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  
          value={from} onChange={change}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" 
          value={current}  
          checked = {current}
          onChange={e=>{ 
            setFormData({...formData , current : !current}) ; 
          }}   /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" 
           value={to} onChange={change}  disabled = {current} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description" 
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

export default AddExperiance
