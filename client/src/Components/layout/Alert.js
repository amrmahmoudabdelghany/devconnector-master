import React, { useEffect } from 'react'
 import {useSelector} from 'react-redux' ; 
const Alert = () => {
 
  const alerts = useSelector((state)=>state.alert.alerts) ; 
   
  if(alerts !== undefined && alerts.length > 0) { 
   return alerts.map((alert)=>(
    <div key = {alert.id} className={`alert alert-${alert.alertType}`}> 
        {alert.msg}
    </div>
   )) ;      
  }
}

export default Alert ;
