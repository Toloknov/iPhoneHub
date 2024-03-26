import "./contact.scss";
import time from "../../assets/images/icons/time.svg";
import Card from "../../ui/card/card";
const Contact = () => {
  return (
    <div className="wrapper">
      <div className="contact">
        <h2 className="contact_title">Контакти</h2>
        <div className="contact_wrap">
          <h3 className="contact_subtitle">
            Наша адреса не змінюється вже 8 років! Ми знаходимося :
          </h3>
          <div className="contact_address">
            <div className="contact_label">
              <b>Адресса :</b>
            </div>
            <div className="contact_street">ТЦ Гулівер Спортивна площа 1a</div>
            <div className="contact_time">
              <img src={time} alt="time" className="contact_time-svg" />
              Години роботи: з 10:00 до 21:00 без вихідних
            </div>
          </div>
          <div className="contact_phone">
            <div className="contact_label">
              <b>Телефон :</b>
            </div>
            <a href="tel:+380935212041" className="contact_phone">
              +38 (093) 521 21 41
            </a>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1068.415466918339!2d30.52224448088917!3d50.43859441516046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cefe0307e81f%3A0x1f234c3b0a0b492!2sGulliver%20-%20Palats%20Sport%20Metro!5e0!3m2!1sru!2sua!4v1703498679259!5m2!1sru!2sua"
        className="contact_map"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Card />
    </div>
  );
};

export default Contact;
