import { createSlice } from "@reduxjs/toolkit";
import AllService from "../services/allService";

const iphoneSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    name: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoadingStatus: true,
    errorAuth: null,
  },
  reducers: {
    iphoneRequested: (state) => {
      state.isLoading = true;
    },
    iphoneReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    phoneRecevedName: (state, action) => {
      state.name = action.payload;
    },
    iphoneRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
    iphoneOneReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = true;
    },
    iphoneOneRequestFiled: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: iphoneReducer, actions } = iphoneSlice;
const {
  iphoneRequested,
  iphoneReceved,
  iphoneRequestFiled,
  iphoneOneReceved,
  phoneRecevedName,
  iphoneOneRequestFiled,
} = actions;

export const loadIphoneList = (query) => async (dispatch) => {
  dispatch(iphoneRequested());
  try {
    const getProd = await AllService.getProd(query);
    dispatch(iphoneReceved(getProd));
  } catch (e) {
    dispatch(iphoneRequestFiled(e.message));
  }
};
export const loadIphoneName = () => async (dispatch) => {
  dispatch(iphoneRequested());
  try {
    const getProd = await AllService.getIphoneName();
    dispatch(phoneRecevedName(getProd));
  } catch (e) {
    dispatch(iphoneOneRequestFiled(e.message));
  }
};
export const loadIphoneById = (id) => async (dispatch) => {
  dispatch(iphoneRequested());
  try {
    const getProd = await AllService.getIphoneById(id);
    dispatch(iphoneOneReceved(getProd));
  } catch (e) {
    dispatch(iphoneOneRequestFiled(e.message));
  }
};
export const getIphoneStatus = (state) => state.iphone.isLoading;
export const getIphone = (state) => state.iphone.entities;
export const getIphoneName = (state) => state.iphone.name;
export const getPhoneById = (id) => (state) => {
  if (state.iphone.entities) {
    return state.iphone.entities.phone.find((iphone) => iphone._id === id);
  }
};

export default iphoneReducer;
