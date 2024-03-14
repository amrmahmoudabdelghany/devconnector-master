import { useDispatch } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import { removeAlert, setAlert } from "../features/alertSlice";



const useAlertService = ()=>{ 
  
    const dispatch = useDispatch() ; 
    
    const showAlert = (msg ,alertType , timeout = 5000 )=>{ 
        const id = uuidv4() ; 

        dispatch(setAlert({msg , alertType ,id }))  
        setTimeout(()=>dispatch(removeAlert(id)) , timeout) ; 
    } ; 

    return {showAlert} ; 

} ; 

export default useAlertService ; 