import { createSlice } from "@reduxjs/toolkit";
import AllService from "../services/allService";
import {
  removeLocalStorageBasketAll,
  setLocalStorageUser,
} from "../utils/localStorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    auth: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    userRequestedSingIn: (state) => {
      state.isLoading = true;
    },
    userRequestedSingUp: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.users.push(action.payload);
      state.error = null;
      state.isLoading = false;
    },
    userReceved: (state, action) => {
      state.auth = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    userRequestFiled: (state, action) => {
      state.auth = null;
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const {
  userRequestedSingIn,
  userRequestedSingUp,
  usersReceved,
  userReceved,
  userRequestFiled,
} = actions;

export const getUserStatus = (state) => state.auth.isLoading;
export const getUserError = (state) => state.auth.error;
export const getUser = (state) => state.auth.auth;

export const setUserById = (id) => async (dispatch) => {
  try {
    const user = await AllService.getUserById(id);
    dispatch(usersReceved(user));
  } catch (error) {
    const { data } = error?.response;
    console.log(data);
  }
};
export const loadUserById = (id) => async (dispatch) => {
  dispatch(userRequestedSingIn());
  try {
    const dataUser = await AllService.getUserById(id);
    dispatch(userReceved(dataUser));
  } catch (error) {
    const { data } = error?.response;
    dispatch(userRequestFiled(data));
  }
};

export const signIn = (payload) => async (dispatch) => {
  dispatch(userRequestedSingIn());

  try {
    const dataUser = await AllService.login(payload);
    setLocalStorageUser(dataUser.user._id);
    removeLocalStorageBasketAll();
    dispatch(userReceved(dataUser.user));
  } catch (error) {
    const { data } = error?.response;
    dispatch(userRequestFiled(data));
  }
};
export const signUp = (payload) => async (dispatch) => {
  dispatch(userRequestedSingUp());
  try {
    const data = await AllService.registration(payload);
    setLocalStorageUser(data.user._id);
    removeLocalStorageBasketAll();
    dispatch(userReceved(data.user));
  } catch (error) {
    const { errors } = error.response.data;
    dispatch(userRequestFiled(errors));
  }
};
export const getUserById = (id) => (state) => {
  if (state.auth.users) {
    return state.auth.users.find((user) => user._id === id);
  }
};

export default userReducer;
