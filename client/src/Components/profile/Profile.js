import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import useAccActions from '../../hooks/useAccActions';
import Spinner from '../layout/Spinner';
import useAuth from '../../hooks/useAuth';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileByIdAction } from '../../features/profileSlice';
import ProfileGithub from './ProfileGithub';

const Profile = () => { 
 
    const {id}  = useParams() ; 
   
    const {isAuthenticated , loading , user} = useAuth() ;
    const profile = useSelector(state=>state.profile.profile) ;  
    const dispatch = useDispatch() ;  
    const isLoading = useSelector(state=>state.profile.loading ) ; 
     useEffect(()=>{  
        //fetchProfileById(id) ;   
          console.log("Id Was : " + id) ; 
        dispatch(getProfileByIdAction({userId : id})) ; 
      
    } , []); 

  return (
   <> 
     {isLoading ? <Spinner/> :  profile&& <>
     <Link to="/profiles" className="btn btn-light">Back To Profiles</Link> 
       {isAuthenticated && !loading && user?._id === profile?.user._id  && 
       <Link to = "/edit-profile" className = "btn btn-dark" >Edit</Link> 
       } 
       <div className='profile-grid my-1'> 
         <ProfileTop profile= {profile}/> 
         <ProfileAbout profile = {profile}/> 
         <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2> 
          {profile?.experience.length > 0 ? profile?.experience.map(exp=>{
           
            return  <ProfileExperience key = {exp?._id} experience = {exp}/>
          }
          ) : <h4>No Experience Credentials</h4>}
          
        </div> 
        <div className="profile-edu bg-white p-2">
    <h2 className="text-primary">Education</h2>
    {profile?.education.length > 0 ? profile?.education.map(edu=>{
           
           return  <ProfileEducation key = {edu?._id} education = {edu}/>
         }
         ) : <h4>No Experience Credentials</h4>}
         
       </div>
        { profile?.githubusername && <>
       
             <ProfileGithub username={profile.githubusername}/> 
    
       
       </>
    }
    </div> 
      </>}
   </>
  )
}

export default Profile
