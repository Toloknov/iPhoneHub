import { createSlice } from "@reduxjs/toolkit";
import AllService from "../services/allService";

const characteristicSlice = createSlice({
  name: "characteristic",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    characteristicRequested: (state) => {
      state.isLoading = true;
    },
    characteristicReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    characteristicRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: characteristicReducer, actions } = characteristicSlice;
const { characteristicRequested, characteristicReceved, characteristicRequestFiled } = actions;
export const loadCharacteristicList = () => async (dispatch) => {
  dispatch(characteristicRequested());
  try {
    const getCharacteristic = await AllService.getCharacteristic();

    dispatch(characteristicReceved(getCharacteristic));
  } catch (e) {
    dispatch(characteristicRequestFiled(e.message));
  }
};
export const getCharacteristicStatus = (state) => state.characteristic.isLoading;
export const getCharacteristic = (state) => state.characteristic.entities;

export const getCharacteristicById = (id) => (state) => {
  if (state.characteristic.entities) {
    return state.characteristic.entities.find((characteristic) => characteristic._id === id);
  }
};
export default characteristicReducer;