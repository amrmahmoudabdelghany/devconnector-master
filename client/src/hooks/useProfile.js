import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadProfile } from "../features/profileSlice";

 


 const useProfile =   ()=> {  
    const dispatch = useDispatch() ;  
    const profile  =  useSelector(state=>state.profile)  ; 
    useEffect(()=>{  
        if(profile.loading){
         dispatch(loadProfile()) ;
            
        }
    } , [dispatch]);
    return profile; 
 } 

 export default useProfile ;