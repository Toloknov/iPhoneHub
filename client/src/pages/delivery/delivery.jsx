import { useState } from "react";
import "./delivery.scss";
import Card from "../../ui/card/card";
const Delivery = () => {
  const [btnState, setBtnState] = useState("delivery");
  return (
    <div className="wrapper">
      <div className="service">
        <button
          className={"service_btn " + (btnState === "delivery" ? "active" : "")}
          onClick={() => setBtnState("delivery")}
        >
          Доставка{" "}
        </button>
        <button
          className={"service_btn " + (btnState === "payment" ? "active" : "")}
          onClick={() => setBtnState("payment")}
        >
          Оплата
        </button>
        <div
          className={"delivery " + (btnState === "delivery" ? "active" : "")}
        >
          <h2 className="delivery_title">
            Які умови доставки кур’єром Нової Пошти?
          </h2>
          <h3 className="delivery_subtitle">Умови доставки</h3>
          <ol className="delivery_lists">
            <li className="delivery_list">
              Термін доставки: <b>3-5 днів.</b>
            </li>
            <li className="delivery_list">
              Коли замовлення надійде у ваш населений пункт, з вами зв’яжеться
              працівник Нової пошти для узгодження терміну доставки.
            </li>
            <li className="delivery_list">
              Оплата пластиковим подарунковим сертифікатом недоступна. Є
              можливість використання електронного подарункового сертифіката.
            </li>
            <li className="delivery_list">
              Максимальна сума оплати готівкою –<b>49 999грн</b> .
            </li>
            <li className="delivery_list">
              Алкогольні напої доставляються лише за передоплати:{" "}
              <b>безготівковим</b>
              розрахунком або <b>карткою, GPay, ApplePay</b>
            </li>
            <li className="delivery_list">
              Якщо вага вантажу більше 30 кг вивантаження з авто відбувається
              клієнтом самостійно. Якщо у Вас нема змоги вивантажити замовлення
              самостійно скористайтесь послугою <b>"Підіймання на поверх"</b>.
            </li>
            <li className="delivery_list">
              Мінімальна сума замовлення - <b>200 грн</b>.
            </li>
          </ol>
        </div>
        <div className={"payment " + (btnState === "payment" ? "active" : "")}>
          <h2 className="payment_title">
            Які документи потрібні для отримання замовлення?
          </h2>
          <h3 className="payment_subtitle">
            Оплата готівкою на суму понад 5 тисяч гривень
          </h3>
          <p className="payment_text">
            Отримання замовлення з готівковою оплатою вартістю 5 000 ₴ - 29 999
            ₴ відбувається за наявності паспорта.
          </p>
          <h3 className="payment_subtitle">
            Оплата готівкою на суму понад 30 тисяч гривень
          </h3>
          <p className="payment_text">
            Відповідно до чинного законодавства, отримання замовлення з
            готівковою оплатою вартістю понад 30000 ₴, вимагає обов'язкової
            ідентифікації особи платника.
          </p>
          <p className="payment_text">
            У випадку доставки товару до відділень перевізників чи точки видачі
            Розетка, верифікація відбувається за паспортом та ІПН на місці.
          </p>
        </div>
        <Card />
      </div>
    </div>
  );
};

export default Delivery;
