import "./payment.scss";
import wallet from "../../assets/images/icons/wallet.svg";
import { useEffect, useState } from "react";

const Payment = ({ setData }) => {
  const [payment, setPayment] = useState({ reception: true, card: false });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      payment: payment.reception ? "При отримані" : "Вже розплатився",
    }));
  }, [payment]);
  return (
    <>
      <div className="payment" onClick={() => setOpen(!open)}>
        <h3 className="payment_title">
          <img src={wallet} alt="wallet" className="payment_img" />
          {payment.reception
            ? "Оплата під час отримання товару"
            : "Оплата картою"}
        </h3>
        <button className="payment_btn">Змінити</button>
      </div>
      <div className={"payment_box " + (open ? "active" : "")}>
        <label
          htmlFor="reception"
          className="payment_label"
          onClick={() => setPayment(() => ({ reception: true, card: false }))}
        >
          <span
            className={
              "payment_radio-fake " + (payment.reception ? "active" : "")
            }
          ></span>
          <input
            type="radio"
            name="payment"
            id="reception"
            className="payment_radio"
          />
          Під час отримання товару
        </label>

        <label
          htmlFor="card"
          className="payment_label"
          onClick={() => setPayment(() => ({ reception: false, card: true }))}
        >
          <span
            className={"payment_radio-fake " + (payment.card ? "active" : "")}
          ></span>
          <input
            type="radio"
            name="payment"
            id="card"
            className="payment_radio"
          />
          Оплатити зараз
        </label>
      </div>
    </>
  );
};

export default Payment;
