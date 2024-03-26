import { NavLink } from "react-router-dom";
import point_map from "../../assets/images/icons/point-map.svg";
import "./navBar.scss";
const NavBar = () => {
  return (
    <div className="wrapper wrap-top-header">
      <a
        target="_blank"
        href="https://maps.app.goo.gl/w36sK2Ugwx6HvoHMA"
        className="point"
        rel="noreferrer"
      >
        <img src={point_map} alt="point" className="point_svg" />
        <address className="point_address">
          ТЦ Гулівер Спортивна площа 1a
        </address>
      </a>

      <nav className="nav">
        <li className="nav_item">
          <NavLink className="nav_link" to="/company">
            Про компанію
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink className="nav_link" to="/delivery">
            Доставка і оплата
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink className="nav_link" to="/guarantee">
            Гаранті та сервіс
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink className="nav_link" to="/contact">
            Контакти
          </NavLink>
        </li>
      </nav>
    </div>
  );
};

export default NavBar;
