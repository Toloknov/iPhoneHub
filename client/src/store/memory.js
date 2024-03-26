import { createSlice } from "@reduxjs/toolkit";
import AllService from "../services/allService";

const memorySlice = createSlice({
  name: "memory",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    memoryRequested: (state) => {
      state.isLoading = true;
    },
    memoryReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    memoryRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: memoryReducer, actions } = memorySlice;
const { memoryRequested, memoryReceved, memoryRequestFiled } = actions;
export const loadMemoryList = () => async (dispatch) => {
  dispatch(memoryRequested());
  try {
    const getMemory = await AllService.getMemory();

    dispatch(memoryReceved(getMemory));
  } catch (e) {
    dispatch(memoryRequestFiled(e.message));
  }
};
export const getMemoryStatus = (state) => state.memory.isLoading;
export const getMemory = (state) => state.memory.entities;

export const getMemoryById = (id) => (state) => {
  if (state.memory.entities) {
    return state.memory.entities.find((memory) => memory._id === id);
  }
};
export default memoryReducer;
