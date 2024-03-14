import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAccActions from '../../hooks/useAccActions';

const Navbar = () => { 
 
  const auth = useSelector((state)=>state.auth) ; 
  const {accLogout}  = useAccActions() ; 
  const authLinks = (
    <ul>
   <li><Link to="/profiles">Developers</Link></li>
      <li> 
        <Link to ="/dashboard">
                  <i className="fas fa-user"/> {' '}
        <span className='hide-sm'>Dashboard </span></Link>
      </li>
      
      <li> 
        <Link to ="/posts">
                  <i className="fas fa-user"/> {' '}
        <span className='hide-sm'>Posts </span></Link>
      </li>
      
      <li> 
        <a onClick={()=>accLogout()} href='#!' > 
        <i className="fas fa-sign-out-alt"/> {' '}
        <span className='hide-sm'>Logout </span></a>
      </li>
      
    </ul>
  ) ;  
  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  ) ; 

  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to ="/"><i className="fas fa-code"></i> DevConnector</Link>
    </h1>
     {!auth.loading && <>{auth.isAuthenticated ? authLinks : guestLinks}</>}
  </nav>
  
  )
}

export default Navbar
