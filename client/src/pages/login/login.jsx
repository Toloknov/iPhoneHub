import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserError, signIn } from "../../store/user";
import "../form.scss";
import { useNavigate } from "react-router-dom";
import google from "../../assets/images/icons/google.svg";
import { removeBasketAll } from "../../store/basket";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    checkbox: false,
  });
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google/callback";
  };
  const errors = useSelector(getUserError);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signIn({
        email: data.email,
        password: data.password,
        checkbox: data.checkbox,
      })
    );
    dispatch(removeBasketAll())
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h2 className="form_title">Увійти</h2>
        <form onSubmit={handleSubmit} method="post">
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
          {errors?.errors?.email && (
            <span className="form_error">{errors?.errors?.email?.msg}</span>
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
          {errors?.errors?.password && (
            <span className="form_error">{errors?.errors?.password?.msg}</span>
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
          {errors?.errors?.checkbox && (
            <span className="form_error">{errors?.errors?.checkbox?.msg}</span>
          )}
          <button className="form_btn">Увійти</button>
        </form>
        <button
          className="form_next"
          onClick={() => navigation("/registration")}
        >
          Зареєструватися
        </button>
        <button className="form_google" onClick={loginWithGoogle}>
          <img src={google} alt="google" />
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;
