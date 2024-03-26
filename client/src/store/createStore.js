import { combineReducers, configureStore } from "@reduxjs/toolkit";
import colorReducer from "./color";
import memoryReducer from "./memory";
import characteristicReducer from "./characteristic";
import userReducer from "./user";
import iphoneReducer from "./iphone";
import basketReducer from "./basket";
import commentReducer from "./comment";

const rootReducer = combineReducers({
  iphone: iphoneReducer,
  color: colorReducer,
  memory: memoryReducer,
  characteristic: characteristicReducer,
  auth: userReducer,
  basket: basketReducer,
  comment: commentReducer,
});
export function createStore() {
  return configureStore({ reducer: rootReducer });
}
