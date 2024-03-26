import "./card.scss";
import smile from "../../assets/images/icons/smile.svg";

const Card = () => {
  return (
    <div className="card">
      <div className="card_item">
        <h3 className="card_title">
          Всім своїм покупцем ми говоримо: «Дурне питання — не поставлене
          питання!»
        </h3>
        <img src={smile} alt="smile" />
        <p className="card_text">
          Так що не соромтеся! Пишіть, дзвоніть, консультуйтеся. Ми завжди раді
          допомогти Вам!
        </p>
      </div>
      <div className="card_item">
        <form className="card_form">
          <div className="card_input-wrap">
            <input
              autoComplete="off"
              type="text"
              name="name"
              className="card_input"
              placeholder="Ваше імя"
            />
            <input
              autoComplete="off"
              type="text"
              name="phone"
              className="card_input"
              placeholder="Телефон"
            />
          </div>
          <label htmlFor="social" className="card_label">
            Переважний спосіб зв'язку:
          </label>
          <div className="card_wrap">
            <div className="card_radio-wrap">
              {" "}
              <input
                type="radio"
                name="social"
                id="telegram"
                className="card_radio"
              />
              <span>Telegram</span>
            </div>
            <div className="card_radio-wrap">
              {" "}
              <input
                type="radio"
                name="social"
                id="whatsApp"
                className="card_radio"
              />
              <span>WhatsApp</span>
            </div>
            <div className="card_radio-wrap">
              {" "}
              <input
                type="radio"
                name="social"
                id="phone"
                className="card_radio"
              />
              <span>Виклик</span>
            </div>
          </div>
          <button className="card_btn">Відправити</button>
          <div className="card_radio-wrap">
            <input
              type="checkbox"
              name="agreement"
              id="agreement"
              className="card_checkbox"
            />
            <label htmlFor="agreement">
              Надсилаючи заявку, ви даєте згоду на обробку персональних даних
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Card;
