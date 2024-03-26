import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import AllService from "../services/allService";

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    colorRequested: (state) => {
      state.isLoading = true;
    },
    colorReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    colorRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: colorReducer, actions } = colorSlice;
const { colorRequested, colorReceved, colorRequestFiled } = actions;
export const loadColorList = () => async (dispatch) => {
  dispatch(colorRequested());
  try {
    const getColor = await AllService.getColor();

    dispatch(colorReceved(getColor));
  } catch (e) {
    dispatch(colorRequestFiled(e.message));
  }
};
export const getColorStatus = (state) => state.color.isLoading;
export const getColor = (state) => state.color.entities;

export const getColorById = (id) => (state) => {
  if (state.color.entities) {
    return state.color.entities.find((color) => color._id === id);
  }
};
export const getColorArrById = createSelector(
  (state) => state.color?.entities,
  (state, arr) => arr,
  (entities, arr) => {
    if (entities && arr) {
      return arr.map((id) => entities.find((color) => color._id === id));
    }
    return [];
  }
);
export default colorReducer;
