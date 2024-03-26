import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageBasket } from "../utils/localStorage";

const PrivateRouteBasket = () => {
  return !getLocalStorageBasket() ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRouteBasket;
