import { useState } from "react";
import AllService from "../../services/allService";
import "./courier.scss";
import { InputMask } from "@react-input/mask";
const Courier = ({ value, onChangeValue, setValue, city, errors }) => {
  const [streets, setStreets] = useState([]);
  const handleStreet = async ({ target }) => {
    if (target.value) {
      const street = await AllService.searchStreet(
        city.Description,
        target.value
      );
      setStreets(street);
    }
  };
  const handelClick = (item) => {
    setValue((prev) => ({ ...prev, street: item }));
    setStreets([]);
  };
  const lift = [
    { id: 1, title: "Відсутній" },
    { id: 2, title: "Присутеій" },
  ];
  const time = [
    { id: 11, title: "11:00 до 16:00" },
    { id: 22, title: "16:00 до 21:00" },
  ];
  console.log(errors);
  return (
    <div className="courier">
      <h3 className="courier_title">Доставка завтра з 11:00</h3>
      <form className="courier_form">
        <div className="courier_wrap">
          <label htmlFor="street" className="courier_label">
            Вулиця
          </label>
          <input
            autoComplete="off"
            type="text"
            id="street"
            name="street"
            className="courier_input street"
            onChange={onChangeValue}
            onKeyUp={handleStreet}
            value={value.street}
          />
          <p className="courier_error">{errors?.street?.msg}</p>
          {streets.length > 0 && (
            <div className="courier_lists">
              {streets.map((item) => (
                <div
                  onClick={() => handelClick(item.Street)}
                  key={item.StreetId}
                  className="courier_list"
                >
                  {item.Street}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="courier_wrap">
          {" "}
          <label htmlFor="house" className="courier_label">
            Будинок
          </label>
          <input
            autoComplete="off"
            type="text"
            id="house"
            name="house"
            className="courier_input house"
            onChange={onChangeValue}
            value={value.house}
          />
          <p className="courier_error">{errors?.house?.msg}</p>
        </div>
        <div className="courier_wrap">
          {" "}
          <label htmlFor="apartment" className="courier_label">
            Квартира
          </label>
          <input
            autoComplete="off"
            type="text"
            id="apartment"
            name="apartment"
            className="courier_input apartment"
            onChange={onChangeValue}
            value={value.apartment}
          />
          <p className="courier_error">{errors?.apartment?.msg}</p>
        </div>
        <div className="courier_wrap">
          {" "}
          <label htmlFor="floor" className="courier_label">
            Поверх
          </label>
          <input
            autoComplete="off"
            type="text"
            id="floor"
            name="floor"
            className="courier_input floor"
            onChange={onChangeValue}
            value={value.floor}
          />
          <p className="courier_error">{errors?.floor?.msg}</p>
        </div>
        <div className="courier_wrap">
          {" "}
          <label htmlFor="lift" className="courier_label">
            Ліфт
          </label>
          <select
            name="lift"
            className="courier_input lift"
            id="lift"
            value={value.lift}
            onChange={onChangeValue}
          >
            <option value="" disabled>
              Наявність вантажного ліфта
            </option>
            {lift.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <p className="courier_error">{errors?.lift?.msg}</p>
        </div>
        <div className="courier_wrap">
          {" "}
          <label htmlFor="date" className="courier_label">
            Дата отримання
          </label>
          <InputMask
            replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
            showMask
            separate
            autoComplete="off"
            mask="dd.mm.yyyy"
            type="text"
            id="date"
            name="date"
            className="courier_input date"
            onChange={onChangeValue}
            value={value.date}
          />
          <p className="courier_error">{errors?.date?.msg}</p>
        </div>
        <div className="courier_wrap">
          {" "}
          <label htmlFor="time" className="courier_label">
            Час отримання
          </label>
          <select
            name="time"
            className="courier_input time"
            id="time"
            value={value.time}
            onChange={onChangeValue}
          >
            <option value="" disabled>
              Оберить час
            </option>
            {time.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <p className="courier_error">{errors?.time?.msg}</p>
        </div>
      </form>
    </div>
  );
};

export default Courier;
