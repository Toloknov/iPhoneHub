import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createStore } from "./store/createStore.js";
import { Provider } from "react-redux";
import "./assets/styles/main.scss";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
