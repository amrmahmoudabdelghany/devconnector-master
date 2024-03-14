import React, { useEffect } from 'react'
import useAccActions from '../../hooks/useAccActions'

import Spinner from '../layout/Spinner';
import { useSelector } from 'react-redux';
import ProfileItem from './ProfileItem';

const Profiles = () => {  
    const {getAllProfiles , fetchAllProfiles , isLoading } = useAccActions() ; 
    const profiles = getAllProfiles() ; 

    useEffect(()=>{ 
       fetchAllProfiles() ;  
    } , []) ; 

  return (
     <> 
       {isLoading() ? <Spinner/> : <> 
        
       <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
         
         {profiles.length > 0 ? 
             profiles.map((profile)=>{ 
             
              return    <ProfileItem key = {profile._id} profile = {profile}/>
             })
         : <h4>No profiles found...</h4>}
     
      </div>
       
       </>}
     </>
  )
}

export default Profiles
