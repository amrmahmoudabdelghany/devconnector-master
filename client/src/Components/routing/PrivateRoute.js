import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const PrivateRoute = () => {  
    
    const auth = useSelector((state)=>state.auth) ; 

    const navigate = useNavigate() ; 
    if(!auth.isAuthenticated) { 
        return <Navigate to = "register" />
    }
  return (
    <Outlet/>
  )
}

export default PrivateRoute
