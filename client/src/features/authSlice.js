import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlert } from "./alertSlice";
import setAuthToken from "../utils/setAuthToken";
import { clearProfile } from "./profileSlice";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { dispatch }) => {
    const { name, email, password } = userData;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);

      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => {
          console.log(err.msg);
          dispatch(showAlert(err.msg, "danger"));
        });
      }
      throw err;
    }
  }
);

export const loadUser = createAsyncThunk("user/auth", async () => {
  console.log("On LoadUser");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    console.log("No Token in the ");
  }
  try {
    const res = await axios.get("/api/auth");
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, password });

      const res = await axios.post("/api/auth", body, config);

      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(JSON.stringify(errors));
      if (errors) {
        errors.forEach((err) => {
          console.log("befor dispatch alert");
          dispatch(showAlert(err.msg, "danger"));
        });
      }
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("token");
      setAuthToken(localStorage.token);
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false; 
        
    
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;


export default authSlice.reducer;

export const login = (email, password) => async (dispatch) => {
    dispatch(clearProfile())
  
      dispatch(userLogin({ email, password }))
      .then(()=>{ 

        dispatch(loadUser()) ;  
  
      }) ;
  
};

export const register = (name, email, password) => async (dispatch) => { 
  dispatch(clearProfile()) ;

    dispatch(userRegister({ name, email, password }))
    .then(()=>{ 
      dispatch(loadUser()) ;  
    })
  
};
