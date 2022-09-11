import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";

import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
} from "./userThunk";

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

// ? Register User Function ////////////
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);

    // try {
    //   const resp = await customFetch.post("/auth/register", user);
    //   return resp.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  }
);

// ? Login User Function ////////////
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);

    // try {
    //   const resp = await customFetch.post("/auth/login", user);
    //   return resp.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  }
);

// ? Update User Function ////////////
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
    // try {
    //   const resp = await customFetch.patch("/auth/updateUser", user, {
    //     headers: {
    //       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //     },
    //   });
    //   return resp.data;
    // } catch (error) {
    //   console.log(error.response);
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  }
);

//// TODO::  CREATE SLICE ///////////////////////////
const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  // * toggleSidebar
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },

  extraReducers: {
    //*  Register   /////////////////////////////
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },

    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);

      toast.success(`Hello There ${user.name}`);
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //*  Login  /////////////////////////////
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);

      toast.success(`Welcome Back ${user.name}`);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //*  Update  /////////////////////////////
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },

    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);

      toast.success("User Updated");
    },

    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
