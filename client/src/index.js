import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import alertReducer from './features/alertSlice';
import authReducer from './features/authSlice';
import profileReducer from './features/profileSlice';
import postReducer from './features/postSlice';

const store = configureStore({ 
  reducer : { 
   alert : alertReducer , 
   auth  : authReducer , 
   profile : profileReducer ,  
   post : postReducer 
  }
})


const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(

  <Provider store={store} >  
    <App />
    </Provider>
);

