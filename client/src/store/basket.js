import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageBasket,
  getLocalStorageUser,
  removeLocalStorageBasket,
  removeLocalStorageBasketAll,
  setLocalStorageBasket,
} from "../utils/localStorage";
import AllService from "../services/allService";
import { toast } from "react-toastify";

const basketSlice = createSlice({
  name: "baskets",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
    },
    basketReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    basketRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
    addBasket: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    deleteBasket: (state) => {
      state.entities = null;
      state.isLoading = false;
    },
  },
});

const { reducer: basketReducer, actions } = basketSlice;
const {
  basketRequested,
  basketReceved,
  basketRequestFiled,
  addBasket,
  deleteBasket,
} = actions;
export const loadBasketList = () => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const basket = JSON.parse(getLocalStorageBasket());
    dispatch(basketReceved(basket));
  } catch (e) {
    dispatch(basketRequestFiled(e.message));
  }
};
export const getBasketStatus = (state) => state.basket.isLoading;
export const getBasket = (state) => state.basket.entities;
export const getBasketErrors = (state) => state.basket.error;

export const addToBasket = (payload, sign) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    setLocalStorageBasket(payload, sign);
    const prod = JSON.parse(getLocalStorageBasket());
    dispatch(addBasket(prod));
  } catch (e) {
    dispatch(basketRequestFiled(e.message));
  }
};
export const removeBasketAll = () => async (dispatch) => {
  dispatch(basketRequested());
  try {
    dispatch(deleteBasket())
  } catch (e) {
    dispatch(basketRequestFiled(e.message));
  }
};
export const addBasketsNv = (payload) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const user = getLocalStorageUser();
    const prod = JSON.parse(getLocalStorageBasket());
    await AllService.addBasketNv({ products: prod, user, ...payload });
    removeLocalStorageBasketAll();
    dispatch(deleteBasket());
    toast.success("Дякуємо, ваше замовлення прийнято!");
  } catch (e) {
    dispatch(basketRequestFiled(e.response.data.errors));
  }
};
export const addBasketsCourier = (payload) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const user = getLocalStorageUser();
    const prod = JSON.parse(getLocalStorageBasket());
    await AllService.addBasketCourier({ products: prod, user, ...payload });
    removeLocalStorageBasketAll();
    dispatch(addBasket());
    toast.success("Дякуємо, ваше замовлення прийнято!");
  } catch (e) {
    dispatch(basketRequestFiled(e.response.data.errors));
  }
};
export const deleteBasketById = (id) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    removeLocalStorageBasket(id);
    const prod = JSON.parse(getLocalStorageBasket());
    console.log(prod);
    dispatch(deleteBasket(prod));
  } catch (e) {
    dispatch(basketRequestFiled(e.message));
  }
};
export default basketReducer;
