import "./checkout.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../form.scss";
import { InputMask } from "@react-input/mask";
import google from "../../assets/images/icons/google.svg";
import {
  addBasketsCourier,
  addBasketsNv,
  getBasket,
  getBasketErrors,
} from "../../store/basket";
import { addSpaceNumber } from "../../utils/utils";
import { Shipping } from "../../ui/shipping";
import { City } from "../../ui/city";
import Payment from "../../ui/payment/payment";
import { getLocalStorageBasket } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ shipping: true, courier: false });
  const [data, setData] = useState({
    name: "",
    phone: "+38",
    email: "",
    searchCity: "",
    department: "",
    street: "",
    house: "",
    apartment: "",
    floor: "",
    lift: "",
    date: "",
    time: "",
    payment: "",
  });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const errorBasket = useSelector(getBasketErrors);
  const basket = useSelector(getBasket);

  const registerWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google/callback";
  };
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleChangeValue = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.shipping) {
      dispatch(
        addBasketsNv({
          cityOrVillage:
            city.SettlementTypeDescription +
            " " +
            city.Description +
            " " +
            city.AreaDescription +
            " обл.",
          department: data.department,
          name: data.name,
          email: data.email,
          phone: data.phone,
        })
      );
    } else if (state.courier) {
      dispatch(
        addBasketsCourier({
          cityOrVillage:
            city.SettlementTypeDescription +
            " " +
            city.Description +
            " " +
            city.AreaDescription +
            " обл.",
          street: data.street,
          house: data.house,
          apartment: data.apartment,
          floor: data.floor,
          lift: data.lift,
          date: data.date,
          time: data.time,
          name: data.name,
          email: data.email,
          phone: data.phone,
        })
      );
    }
  };
  const allPrice =
    basket &&
    addSpaceNumber(
      basket.reduce((prev, item) => {
        return (
          prev + Number(item?.discountedPrice.split(" ").join("")) * item.col
        );
      }, 0)
    );
  useEffect(() => {
    if (!getLocalStorageBasket()) {
      navigate("/");
    }
  }, [handleSubmit]);
  return (
    <div className="wrapper">
      <hr className="checkout_line" />
      <div className="checkout">
        <div className="checkout_main-wrap">
          <form className="checkout_form">
            <h2 className="checkout_title">Оформлення замовлення</h2>
            <h3 className="checkout_subtitle">Ваші контактні дані</h3>
            <div className="checkout_box">
              <div className="checkout_wrap">
                <label htmlFor="name" className="checkout_label">
                  Ім'я
                </label>{" "}
                <input
                  autoComplete="off"
                  type="text"
                  onChange={handleChange}
                  className="checkout_input"
                  name="name"
                  id="name"
                  value={data.name}
                />
                {errorBasket?.name && (
                  <span className="checkout_error">{errorBasket.name.msg}</span>
                )}
              </div>
              <div className="checkout_wrap">
                <label htmlFor="telephone" className="checkout_label">
                  Телефон
                </label>{" "}
                <InputMask
                  mask="+38 (___) ___-__-__"
                  replacement={{ _: /\d/ }}
                  autoComplete="off"
                  type="text"
                  onChange={handleChange}
                  className="checkout_input"
                  name="phone"
                  id="telephone"
                  value={data.phone}
                />
                {errorBasket?.phone && (
                  <span className="checkout_error">
                    {errorBasket.phone.msg}
                  </span>
                )}
              </div>
              <div className="checkout_wrap">
                <label htmlFor="email" className="checkout_label">
                  Електронна пошта
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  onChange={handleChange}
                  className="checkout_input"
                  name="email"
                  id="email"
                  value={data.email}
                />
                {errorBasket?.email && (
                  <span className="checkout_error">
                    {errorBasket.email.msg}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              className="form_google"
              onClick={registerWithGoogle}
            >
              <img src={google} alt="google" />
              Google
            </button>
          </form>
          <City
            city={city}
            handleChange={handleChange}
            value={data}
            setValue={setData}
            cities={cities}
            setCities={setCities}
            setCity={setCity}
          />
          <div className="checkout_booking">
            <h3 className="checkout_booking-title">
              Замовлення{" "}
              <span>
                на суму:<b> {allPrice || 0}₴</b>
              </span>
            </h3>
            <ul className="checkout_booking-lists">
              {basket &&
                basket.map((item) => {
                  return (
                    <li key={item._id} className="checkout_booking-list">
                      <img
                        src={item.image}
                        alt="card"
                        className="checkout_booking-img"
                      />
                      <div className="checkout_booking-container">
                        <p className="checkout_booking-text">
                          Мобільний телефон {item.series}
                        </p>
                        <p className="checkout_booking-sum">
                          <span>{item.price}₴</span>
                          <span>
                            {item.discountedPrice} ₴ x {item.col} од.
                          </span>
                        </p>
                        <p className="checkout_booking-price">
                          {addSpaceNumber(
                            item.discountedPrice.split(" ").join("") * item.col
                          )}
                          ₴
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <Shipping
            data={data}
            setData={setData}
            onChange={handleChange}
            city={city}
            onChangeValue={handleChangeValue}
            value={data}
            setValue={setData}
            state={state}
            setState={setState}
            errors={errorBasket}
          />
          <Payment setData={setData} />
        </div>

        <div className="checkout_card">
          <h3 className="checkout_card-title">Разом</h3>
          <div className="checkout_card-wrap">
            <span className="checkout_card-span">
              {basket && basket.length >= 1
                ? `${basket.length} товари на суму`
                : "нема товару"}{" "}
            </span>
            <span className="checkout_card-span ">{allPrice || 0}₴</span>
          </div>
          <div className="checkout_card-wrap">
            <span className="checkout_card-span">Вартість доставки</span>
            <span className="checkout_card-span">
              <b>за тарифами перевізника</b>
            </span>
          </div>
          <div className="checkout_card-wrap">
            <span className="checkout_card-span">До сплати</span>
            <span className="checkout_card-span price">{allPrice || 0}₴</span>
          </div>
          <button className="form_btn" onClick={handleSubmit}>
            Замовлення підтверджую
          </button>
          <div className="checkout_card-text">
            Отримання замовлення від 5 000 ₴ - 30 000 ₴ за наявності документів.
            При оплаті готівкою від 30 000 ₴ необхідно надати документи для
            верифікації згідно вимог Закону України від 06.12.2019 №361-IX
          </div>
          <h3 className="checkout_card-subtitle">
            Підтверджуючи замовлення, я приймаю умови:
          </h3>
          <ul className="checkout_card-lists">
            <li className="checkout_card-list">
              положення про обробку і захист персональних даних{" "}
            </li>
            <li className="checkout_card-list">угоди користувача </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
