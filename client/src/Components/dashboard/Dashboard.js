import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import useAccActions from "../../hooks/useAccActions";
import { useEffect } from "react";
import { loadProfile } from "../../features/profileSlice";

const Dashboard = () => { 
 
    const {user} = useAuth() ;  
    const profile = useSelector(state=>state.profile.profile) ; 
    const loading = useSelector(state => state.profile.loading) ; 
    const dispatch = useDispatch() ; 

    const {deleteEducation , deleteExperience , deleteAccount } = useAccActions() ; 
    useEffect(()=>{ 
         dispatch(loadProfile()) ; 
    } , []) ;
  return  loading && profile === null ?  (<Spinner/>)  : <> 
      <h1 className="large text-primary">Dashboard</h1> 
       <p className="lead" > 
        <i className="fas fa-user" />
            {' '}  Welcome   {user && user.name}
       </p> 
       {profile != null ? (<> <DashboardActions/> 
         {profile.experience.length > 0 ?  <Experience experience={profile.experience} deleteExperience = {deleteExperience} /> : ''} 
         {profile.education.length > 0 ? <Education education={profile.education} deleteEducation = {deleteEducation} /> : ''} 
         <div className="my-2">
            <button className="btn btn-danger" onClick={(e)=>deleteAccount()}>
                <i className="fas fa-user-minus"></i>

                Delete My Account
            </button> 
            
          </div>
        </>) : (
        <> 
        
            <p>You have not yet setup a profile, please add some info </p>
            <Link to ="/create-profile" className = "btn btn-primary my-1"> 
                Create Profile
            </Link>
        </>
       )}
  
  </>
}

export default Dashboard
