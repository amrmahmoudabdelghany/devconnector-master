
import Landing from "./Components/layout/Landing";
import Navbar from "./Components/layout/Navbar";
import './App.css' ; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Layout from "./Components/layout/Layout";
import setAuthToken from "./utils/setAuthToken";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/authSlice";
import PrivateRoute from "./Components/routing/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";
import CreateProfile from "./Components/profile-form/CreateProfile";
import EditProfile from "./Components/profile-form/EditProfile";
import AddExperience from "./Components/profile-form/AddExperience";
import AddEducation from "./Components/profile-form/AddEducation";
import Profiles from "./Components/profiles/Profiles";
import Profile from "./Components/profile/Profile";
import Posts from "./Components/posts/Posts";
import Post from "./Components/post/Post";

if(localStorage.token) { 
  setAuthToken(localStorage.token) ;
}

const App = ()=> {
  
  
  const dispatch = useDispatch() ;


  useEffect(()=>{ 
    console.log("User Authentcation state changed") ; 
      if(localStorage.token) {
        dispatch(loadUser()) ;  
      }
    } , []) ;
  
  return ( 
     <>
    
     <BrowserRouter> 
  
     <Navbar/>
      
    <Routes> 
        <Route index element = {<Landing/> } />
         
        <Route element = {<Layout/>} >  
        
           <Route  path="login" element = {<Login/>} /> 
           <Route  path="register" element = {<Register/>} />   
           <Route  path="profiles" element = {<Profiles/>} />   
           <Route  path="profile/:id" element = {<Profile/>} />   

           <Route element ={<PrivateRoute/>} >

                <Route path = "dashboard" element = {<Dashboard/>} /> 
                <Route path ="create-profile" element = {<CreateProfile/>} />
                <Route path ="edit-profile" element = {<EditProfile/>} />
                <Route path ="add-experiance" element = {<AddExperience/>} />
                <Route path ="add-education" element = {<AddEducation/>} />
                <Route exact path ="posts" element = {<Posts/>} />
                <Route exact path ="post/:postId" element = {<Post/>} />
               
        </Route>
        </Route> 
        
      </Routes>    
 </BrowserRouter>
  
     
     </>
)}
export default App;
