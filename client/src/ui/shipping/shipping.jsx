import { NovaPoshta } from "../novaPoshta";
import "./shipping.scss";
import { Courier } from "../courier";
const Shipping = ({
  onChangeValue,
  city,
  value,
  setValue,
  state,
  setState,
  errors,
}) => {
  return (
    <div className="shipping">
      <h2 className="shipping_title">Доставка</h2>
      <div className={"shipping_box " + (state.courier ? "active" : "")}>
        <span
          className={"shipping_text " + (state.courier ? "active" : "")}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              courier: true,
              shipping: false,
            }))
          }
        >
          <span className="shipping_radio-fake "></span>
          Кур'єр на вашу адресу
        </span>
        <span className="shipping_price">
          <b>99 ₴</b>
        </span>
        {!state.shipping && (
          <Courier
            value={value}
            setValue={setValue}
            onChangeValue={onChangeValue}
            city={city}
            errors={errors}
          />
        )}
      </div>
      <div className={"shipping_box " + (state.shipping ? "active" : "")}>
        <span
          className={"shipping_text " + (state.shipping ? "active" : "")}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              shipping: true,
              courier: false,
            }))
          }
        >
          <span className="shipping_radio-fake"></span>
          Самовивіз з Нової Пошти
        </span>
        <span className="shipping_price">
          <b>79 ₴</b>
        </span>
        {state.shipping && (
          <NovaPoshta
            data={value}
            setData={setValue}
            onChange={onChangeValue}
            city={city}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};

export default Shipping;
