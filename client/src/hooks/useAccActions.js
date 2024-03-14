import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { addEducationAction, 
     addExperienceAction, 
      clearProfile, 
       deleteAccountAction,  
       deleteEducationAction, 
        deleteExperienceAction, 
         getProfilesAction  , 
        getProfileByIdAction,
        getGithubReposAction} from "../features/profileSlice";
import useAlertService from "./useAlertService";
import { useNavigate } from "react-router-dom";
import {createProfile as createProfileAction} from '../features/profileSlice' ; 

const useAccActions = ()=> {
  
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const {showAlert} = useAlertService() ; 
    const {profile} = useSelector((state)=>state.profile) ; 
    const profiles = useSelector((state)=>state.profile.profiles) ; 
    const loading = useSelector((state)=>state.profile.loading) ; 
    const accLogout = ()=>{ 
        dispatch(logout()) ; 
        dispatch(clearProfile()) ; 
        showAlert("Account Loggout successfully" , 'success'); 
    } ; 
  
 

    const getCurrentProfile = ()=>{ 
        return profile ; 
    } 

    const addExperiance  = (userData )=> { 
        console.log("On Add Experiance to The Profile " , JSON.stringify(userData)) ;
        dispatch(addExperienceAction({userData})) 
        .unwrap() 
        .then((profile)=>{ 
            showAlert(`Experiance Added  ` , 'success') ;  
            navigate("/dashboard") ;             
        })
        .catch(({errors} )=>{ 
           
            if(errors)
            errors.forEach((err) => {
                 showAlert(err.msg, "danger");
              });
           
        })

    }

    const addEducation = (userData)=> { 
        console.log("On Add Education to The Profile " , JSON.stringify(userData)) ;
        dispatch(addEducationAction({userData})) 
        .unwrap() 
        .then((profile)=>{ 
            showAlert(`Education Added  ` , 'success') ;  
            navigate("/dashboard") ; 
        })
        .catch(({errors} )=>{ 
           
            if(errors)
            errors.forEach((err) => {
                 showAlert(err.msg, "danger");
              });
           
        })
    }
    const createProfile = (userData  , edit = false)=>{ 
        console.log("On Create Profile : " + JSON.stringify(userData) ) ; 
        
        dispatch(createProfileAction({userData}))
        .unwrap()
        .then((action)=>{
            showAlert(`Profile ${edit ? 'Edited' : 'Created'} ` , 'success') ;  
            if(!edit)
            navigate("/dashboard") ;
        })
        .catch(({errors} )=>{ 
           
            if(errors)
            errors.forEach((err) => {
                 showAlert(err.msg, "danger");
              });
           
        })
        
    }

    const deleteExperience = (id)=>{ 
         dispatch(deleteExperienceAction({id}))
         .then(()=>{ 
            showAlert("Experience Removed" , 'success') ; 
         })
         .catch((err)=>{ 
            showAlert(err.msg ,  'danger') ; 
         }) ; 
    }

    const deleteEducation = (id)=>{ 
         dispatch(deleteEducationAction({id}))
         .then(()=>{ 
            showAlert("Education Removed" , 'success') ; 
         })
         .catch((err)=>{ 
            showAlert(err.msg ,  'danger') ; 
         }) ; 
    } 

    const deleteAccount = ()=>{ 
        dispatch(deleteAccountAction()) 
        .then((ret)=>{ 
            showAlert(ret.payload.msg , 'success') ;
            dispatch(logout()) ; 
            navigate("/") ;
        })
        .catch((err) =>{ 
          showAlert(err.payload.msg , 'danger') ; 
        })
    } 

    const fetchAllProfiles = ()=>{ 
        dispatch(getProfilesAction())  ; 
    }
    const getAllProfiles  = ()=>{ 
       return profiles ; 
    }

    const fetchProfileById = (userId)=>{ 
        
        dispatch(getProfileByIdAction({userId})) ;
    }
   // const updateProfile = ()
    const fetchGithubRepos = (username)=>{ 
        dispatch(getGithubReposAction({username})) ; 
    } 
    const isLoading = () =>{ 
        return loading ; 
    }

 return {accLogout , 
     createProfile ,
      getCurrentProfile ,
       addEducation , 
       addExperiance ,
        deleteEducation , 
        deleteExperience ,
         deleteAccount , 
        getAllProfiles , 
        fetchAllProfiles ,
   fetchGithubRepos , 
isLoading , 
fetchProfileById} ; 
}


export default useAccActions ; 