import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserError, signUp } from "../../store/user";
import "../form.scss";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";
import google from "../../assets/images/icons/google.svg";
import { removeBasketAll } from "../../store/basket";

const Registration = () => {
  const navigation = useNavigate();
  const [data, setData] = useState({
    name: "",
    telephone: "+38",
    email: "",
    password: "",
    checkbox: false,
  });
  const inputRef = useMask({
    mask: "+38 (___) ___-__-__",
    replacement: { _: /\d/ },
  });
  const errors = useSelector(getUserError);
  const registerWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google/callback";
  };
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ email: data.email, password: data.password, ...data }));
    dispatch(removeBasketAll());
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h2 className="form_title">Реєстрація</h2>
        <form onSubmit={handleSubmit} className="form_form">
          <label htmlFor="name" className="form_label">
            Ім'я :
          </label>{" "}
          <input
            autoComplete="off"
            type="text"
            onChange={handleChange}
            className="form_input"
            name="name"
            id="name"
            value={data.name}
          />
          {errors && errors.name && (
            <span className="form_error">{errors.name.msg}</span>
          )}
          <label htmlFor="telephone" className="form_label">
            Телефон :
          </label>{" "}
          <input
            ref={inputRef}
            autoComplete="off"
            type="text"
            onChange={handleChange}
            className="form_input"
            name="telephone"
            id="telephone"
            value={data.telephone}
          />
          {errors && errors.telephone && (
            <span className="form_error">{errors.telephone.msg}</span>
          )}
          <label htmlFor="email" className="form_label">
            Логін :
          </label>
          <input
            autoComplete="off"
            type="text"
            onChange={handleChange}
            className="form_input"
            name="email"
            id="email"
            value={data.email}
          />
          {errors && errors.email && (
            <span className="form_error">{errors.email.msg}</span>
          )}
          <label htmlFor="password" className="form_label">
            Пароль :
          </label>
          <input
            autoComplete="off"
            type="text"
            onChange={handleChange}
            className="form_input"
            name="password"
            id="password"
            value={data.password}
          />
          {errors && errors.password && (
            <span className="form_error">{errors.password.msg}</span>
          )}
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            onChange={() =>
              setData((prev) => ({ ...prev, checkbox: !prev.checkbox }))
            }
            checked={data.checkbox}
          />
          <label htmlFor="checkbox" className="form_label-label">
            Надсилаючи заявку, ви даєте згоду на обробку персональних даних
          </label>
          {errors?.checkbox && (
            <span className="form_error">{errors.checkbox.msg}</span>
          )}
          <button className="form_btn">Зареєструватися</button>
        </form>
        <button className="form_next" onClick={() => navigation("/login")}>
          Я вже зареєстрований
        </button>
        <button className="form_google" onClick={registerWithGoogle}>
          <img src={google} alt="google" />
          Google
        </button>
      </div>
    </div>
  );
};

export default Registration;
