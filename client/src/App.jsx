import { useEffect } from "react";
import { Registration } from "./pages";
import { Login } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./ui/body";
import { Catalog } from "./pages/catalog";
import { useDispatch } from "react-redux";
import { loadColorList } from "./store/color";
import { loadMemoryList } from "./store/memory";
import { loadCharacteristicList } from "./store/characteristic";
import { PageProduct } from "./pages/pageProduct";
import { Company } from "./pages/company";
import { Delivery } from "./pages/delivery";
import { Contact } from "./pages/contact";
import { Guarantee } from "./pages/guarantee";
import AllService from "./services/allService";
import { loadUserById } from "./store/user";
import {
  getLocalStorageToken,
  getLocalStorageUser,
} from "./utils/localStorage";
import { loadBasketList } from "./store/basket";
import { Checkout } from "./pages/checkout";
import PrivateRouteBasket from "./components/privateRouteBasket";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadColorList());
    dispatch(loadMemoryList());
    dispatch(loadCharacteristicList());
    dispatch(loadBasketList());
    if (getLocalStorageToken()) {
      AllService.checkAuth();
    }
    if (getLocalStorageUser()) {
      dispatch(loadUserById(getLocalStorageUser()));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Catalog />} />
          <Route path="company" element={<Company />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="guarantee" element={<Guarantee />} />
          <Route path="product/:id" element={<PageProduct />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route element={<PrivateRouteBasket />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
