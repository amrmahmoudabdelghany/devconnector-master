import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 
 
 const initialState = { 
    profile : null , 
    profiles : [],
    repos : [] , 
    loading : true , 
    error : null 
 }
 
 export const loadProfile  = createAsyncThunk("user/profile" , async ()=>{ 
    
    try { 
         
        
     const response = await axios.get("api/profile/me") ; 
      
     return response.data ; 
    }catch(err) {   
        throw err.response ; 
    }

 }) ; 

 export const createProfile = createAsyncThunk("user/profile/create" , async ({userData} , {rejectWithValue})=>{ 
    
    try { 
        
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
     
      console.log("User Data Passed to backend : " + JSON.stringify(userData)) ; 
    
       const response =  await axios.post("/api/profile" , userData , config) ;  
       return response.data ; 
    }catch(err) {  
        
     return   rejectWithValue( err.response.data) ; 
    }

 })  ;  

 export const addExperienceAction =  createAsyncThunk("user/profile/experience/add" , async ({userData} , {rejectWithValue})=>{ 
     
    try { 
 
        const config = { 
            headers : { 
                'Content-Type' : 'application/json'
            }
        } ; 
 
        return (await axios.put("/api/profile/experience" , userData , config)).data ; 

    }catch(err) { 
      return rejectWithValue(err.response.data) ; 
    } 

 }) ;

 export const addEducationAction = createAsyncThunk("user/profile/education/add" , async ({userData} , {rejectWithValue})=>{ 
   try { 
        return (await axios.put("/api/profile/education" , userData , {headers:{
            'Content-Type' : 'application/json'
        }})).data ; 

   } catch (err) {
    return rejectWithValue(err.response.data) ; 
   }
 }) ; 


 export const deleteExperienceAction = createAsyncThunk("user/profile/experience/delete" , async ({id} , {rejectWithValue})=>{ 
    try { 
        return (await axios.delete(`/api/profile/experience/${id}`)).data 
    } catch(err){ 
        return rejectWithValue({msg:err.response.statusText , status : err.response.status}) ; 
    }
 }) ;  
 export const deleteEducationAction = createAsyncThunk("user/profile/education/delete" , async ({id} , {rejectWithValue})=>{ 
    try { 
        return (await axios.delete(`/api/profile/education/${id}`)).data 
    } catch(err){ 
        return rejectWithValue({msg:err.response.statusText , status : err.response.status}) ; 
    }
 }) ;  
 export const deleteAccountAction = createAsyncThunk("user/profile/delete" , async ( userData = null , {rejectWithValue})=>{ 
    try { 
        return (await axios.delete(`/api/profile`)).data 
    } catch(err){ 
        return rejectWithValue({msg:err.response.statusText , status : err.response.status}) ; 
    }
 }) ;   

 export const getProfilesAction = createAsyncThunk("user/profile/all" , async (userData = null , {rejectWithValue})=>{ 
    try { 
         return (await axios.get("/api/profile")).data ; 
    }catch(err) { 
        return rejectWithValue({msg:err.response.statusText , status : err.response.status}) ; 
    }
 }) ; 

 export const getProfileByIdAction = createAsyncThunk("user/profile/get" , async ({userId} , {rejectWithValue})=>{ 
     try {  
    
          return (await axios.get(`/api/profile/user/${userId}`)).data ; 
     }catch(err) { 
        return rejectWithValue({msg:err.response.statusText , status : err.response.status}) ;      
     }
 }) ; 

 export const getGithubReposAction = createAsyncThunk("user/profile/github/get" , async ({username} , {rejectWithValue})=>{ 
    try { 
        return (await axios.get(`/api/profile/github/${username}`)).data ;     
    }catch(err) { 
        return rejectWithValue({msg:err.response.statusText , status : err.response.status}) ;          
    }
 })
 
 const setProfile = (state , action)=>{ 
    state.profile = action.payload ; 
    state.loading = false ; 
 }  ; 

 const setError = (state , action)=>{ 
    state.loading = false ; 
    state.error = action.payload ; 
 } ; 


 const profileSlice = createSlice({ 
    name : "profile" , 
    initialState , 
    reducers : {
        clearProfile(state , action) { 
            state.profile = null ; 
            state.loading = false ; 
            state.repos = [] ;  

        }
    } , 
    extraReducers : (builder)=> { 

        builder
        .addCase(loadProfile.pending , (state , action)=>{ 
            state.profile = null ; 
            state.loading = true ; 
            
        })
        .addCase(loadProfile.fulfilled , setProfile)
        .addCase(loadProfile.rejected , (state , action)=>{  
             
            state.error = {msg : action?.payload?.statusText , status : action?.payload?.status}  ;
            state.loading = false ; 
        })
        .addCase(createProfile.pending , (state , action)=>{ 
            state.profile = null ;  
            state.loading = false ;  
            
        })
        .addCase(createProfile.fulfilled , setProfile)
        .addCase(createProfile.rejected , (state , action)=>{ 
            state.profile = null ; 
            state.loading = false ;  
            state.error = action.payload ; 
           
        }) 
        .addCase(addExperienceAction.pending , (state , action)=>{ 
            
        })
        .addCase(addExperienceAction.fulfilled , setProfile)
        .addCase(addExperienceAction.rejected , setError)
        .addCase(addEducationAction.pending , (state , action)=>{ 

        }) 
        .addCase(addEducationAction.fulfilled ,setProfile)
        .addCase(addEducationAction.rejected , setError)
        
        .addCase(deleteEducationAction.fulfilled ,setProfile) 
        .addCase(deleteEducationAction.rejected , setError) 
        
        .addCase(deleteExperienceAction.fulfilled ,setProfile) 
        .addCase(deleteExperienceAction.rejected , setError) 
        .addCase(deleteAccountAction.fulfilled , (state , action)=> {
            state.profile = null ; 
            state.repos = [] ; 
            state.loading = true ; 
        }) 
        .addCase(getProfilesAction.pending , (state , action)=>{ 
         //   state.profile = null ; 
            state.profiles = null ; 
            state.loading = true ; 
        })
        .addCase(getProfilesAction.fulfilled , (state , action)=>{ 
           // state.profile = null ; 
            state.profiles = action.payload ; 
            state.loading = false ;  
            
        }) 
        .addCase(getProfilesAction.rejected ,(state , action)=>{ 
            //state.profile = null ; 
            state.profiles = [] ;  
            state.loading = false ; 
            state.loadProfile = false ; 
        }) 
        .addCase(getProfileByIdAction.pending , (state , action)=> { 
            state.loading = true ; 
            state.profile = null ;
        })
        .addCase(getProfileByIdAction.fulfilled , setProfile) 
        .addCase(getProfileByIdAction.rejected , setError) 
        .addCase(getGithubReposAction.fulfilled , (state , action)=>{ 
            state.repos = action.payload ; 
            state.loading = false ; 
        })
        .addCase(getGithubReposAction.rejected , (state , action)=>{ 
            state.repos = [] ; 
            state.loading = false ; 
        })
    }

 }) ; 

 export const {clearProfile}  = profileSlice.actions ; 
 export default profileSlice.reducer ; 
