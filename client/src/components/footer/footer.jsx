import "./footer.scss";
import logo from "../../assets/images/icons/logo.svg";
import tel from "../../assets/images/icons/tel.svg";
import telegam from "../../assets/images/icons/telegram.svg";
import whatsapp from "../../assets/images/icons/whatsapp.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer_about">
          <div className="footer_logo">
            <img src={logo} alt="logo" className="footer_logo-svg" />
          </div>
          <div className="footer_list">
            <div className="footer_list-nav">
              <div className="footer_list-item">
                <NavLink className="footer_list-link" to="/">
                  Про компанію
                </NavLink>
              </div>
              <div className="footer_list-item">
                <NavLink className="footer_list-link" to="/">
                  Доставка і оплата
                </NavLink>
              </div>
              <div className="footer_list-item">
                <NavLink className="footer_list-link" to="/">
                  Обмін та повернення
                </NavLink>
              </div>
            </div>
            <div className="footer_list-nav">
              <div className="footer_list-item">
                <NavLink className="footer_list-link" to="/">
                  Гаранті та сервіс
                </NavLink>
              </div>
              <div className="footer_list-item">
                <NavLink className="footer_list-link" to="/">
                  Контакти
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_info">
          <div className="footer_address">
            <div className="footer_address-point">
              ТЦ Гулівер Спортивна площа 1a
            </div>
            <div className="footer_address-time">
              09:00 — 23:00 без вихідних
            </div>
          </div>
          <div className="footer_contact">
            <a href="tel:+380935212041" className="footer_contact-number">
              <img src={tel} alt="tel" />
              <span>+38 (093) 521 20 41</span>
            </a>
            <a
              href="mailto:tolknivita24@gmail.com"
              className="footer_contact-email"
            >
              tolknivita24@gmail.com
            </a>
            <div className="footer_contact-social">
              <a
                target="_blank"
                href="https://t.me/ViktorToloknov"
                rel="noreferrer"
              >
                <img src={telegam} alt="tel" />
              </a>

              <a href="">
                <img src={whatsapp} alt="tel" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
