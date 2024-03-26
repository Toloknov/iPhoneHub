import "./topPanel.scss";
import logo from "../../assets/images/icons/logo.svg";
import telegram from "../../assets/images/icons/telegram.svg";
import whatsapp from "../../assets/images/icons/whatsapp.svg";
import tel from "../../assets/images/icons/tel-black.svg";
import heard from "../../assets/images/icons/heard.svg";
import search from "../../assets/images/icons/search.svg";
import account from "../../assets/images/icons/account.svg";
import { NavLink } from "react-router-dom";
import Basket from "../basket/basket";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getBasket } from "../../store/basket";
const TopPanel = ({ searchValue, onChange, onSubmit }) => {
  const [active, setActive] = useState(false);
  const baskets = useSelector(getBasket);
  return (
    <div className="panel ">
      <div className="wrapper">
        <NavLink to="/" className="panel_logo">
          <img src={logo} alt="logo" className="panel_logo-img" />
        </NavLink>
        <div className="panel_container">
          <div className="panel_search">
            <input
              autoComplete="off"
              autoFocus={true}
              type="search"
              onChange={onChange}
              name="search"
              value={searchValue.search || ""}
              className="panel_search-input"
              placeholder="Пошук..."
            />
            <button className="panel_search-button" onClick={onSubmit}>
              <img src={search} alt="search" />
              Знайти
            </button>
          </div>
          <div className="panel_social">
            <a
              target="_blank"
              href="https://t.me/ViktorToloknov"
              rel="noreferrer"
              className="panel_social-link"
            >
              <img src={telegram} alt="telegram" className="panel_social-img" />
            </a>
            <a className="panel_social-link">
              <img src={whatsapp} alt="whatsapp" className="panel_social-img" />
            </a>
          </div>
          <div className="panel_tel">
            <a href="tel:380935212041" className="panel_tel-number">
              <img src={tel} alt="tel" className="panel_tel-image" />
              +38(093)521-20-41
            </a>
          </div>
          <NavLink to="/login" className="panel_account">
            <button className="panel_account-btn">
              <img src={account} alt="heard" className="panel_account-img" />
            </button>
          </NavLink>
          <button className="panel_like" onClick={() => setActive(!active)}>
            <div className="panel_like-union">
              <img src={heard} alt="heard" className="panel_like-img" />
              <span className="panel_like-num">{baskets?.length || 0}</span>
            </div>
          </button>
        </div>
      </div>
      <Basket active={active} setActive={setActive} baskets={baskets} />
    </div>
  );
};

export default TopPanel;
