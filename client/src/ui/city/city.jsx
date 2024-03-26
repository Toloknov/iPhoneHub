import { useEffect, useState } from "react";
import AllService from "../../services/allService";
import map from "../../assets/images/icons/point-map.svg";
import truck from "../../assets/images/icons/truck.svg";
import "./city.scss";
import {
  getLocalStorageCity,
  setLocalStorageCity,
} from "../../utils/localStorage";
const City = ({
  value,
  handleChange,
  setValue,
  cities,
  setCities,
  setCity,
  error,
  setError,
  city,
}) => {
  const [active, setActive] = useState(false);

  const handleCity = (city) => {
    setCity(city);
    setLocalStorageCity(city);
    setValue((prev) => ({
      ...prev,
      searchCity: `${city.Description} - ${city.AreaDescription} Обл.`,
    }));
    setCities([]);
  };
  const findCity = async () => {
    const city = value.searchCity;
    if (city.length) {
      const data = await AllService.nvGetCity(city);
      setCities(data.data);
      if (data.data.length < 1 && city) {
        setError("Місто не знайдено. Перевірте правельність написання.");
      } else if (!value.searchCity) {
        setError("");
      }
    } else {
      setCities([]);
    }
  };
  const clickToBtn = async (city) => {
    const findCity = await AllService.nvGetCity(city);
    setCity(findCity.data[0]);
    setLocalStorageCity(findCity.data[0]);
    setValue((prev) => ({
      ...prev,
      searchCity: `${findCity.data[0].Description} ${findCity.data[0].AreaDescription} обл.`,
    }));
  };
  useEffect(() => {
    if (getLocalStorageCity()) {
      setCity(JSON.parse(getLocalStorageCity()));
    }
    navigator.geolocation.getCurrentPosition(async (data) => {
      const info = await AllService.bigData(
        data.coords.latitude,
        data.coords.longitude
      );
      const findCity = await AllService.nvGetCity(info.city);
      setCity(findCity.data[0]);
      setLocalStorageCity(findCity.data[0]);
    });
  }, []);
  return (
    <div className="city" onClick={() => setActive(!active)}>
      <div className="city_box">
        <img src={map} alt="map" className="city_img" />
        <p className="city_street">
          {Object.keys(city).length === 0
            ? "Ваше місто?"
            : city.Description + "  " + city.AreaDescription + " обл."}
        </p>
        <button className="city_btn">Змінити</button>
      </div>
      <div
        className={"city_modal " + (active ? "active" : "")}
        onClick={() => setActive(false)}
      >
        <div
          className={"city_container " + (active ? "active" : "")}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="city_title">Виберіть своє місто</h2>
          <h3 className="city_subtitle">
            <img src={truck} alt="truck" /> Доставляємо замовлення по всій
            Україні!
          </h3>
          <div className="city_regions">
            <div className="city_region">
              <button
                onClick={() => clickToBtn("Київ")}
                className={
                  "city_region-btn " +
                  (city.Description === "Київ" ? "active" : "")
                }
              >
                Київ
              </button>
            </div>
            <div className="city_region">
              <button
                onClick={() => clickToBtn("Харків")}
                className={
                  "city_region-btn " +
                  (city.Description === "Харків" ? "active" : "")
                }
              >
                Харків
              </button>
            </div>
            <div className="city_region">
              <button
                onClick={() => clickToBtn("Одеса")}
                className={
                  "city_region-btn " +
                  (city.Description === "Одеса" ? "active" : "")
                }
              >
                Одеса
              </button>
            </div>
            <div className="city_region">
              <button
                onClick={() => clickToBtn("Дніпро")}
                className={
                  "city_region-btn " +
                  (city.Description === "Дніпро" ? "active" : "")
                }
              >
                Дніпро
              </button>
            </div>
            <div className="city_region">
              <button
                onClick={() => clickToBtn("Запоріжжя")}
                className={
                  "city_region-btn " +
                  (city.Description === "Запоріжжя" ? "active" : "")
                }
              >
                Запоріжжя
              </button>
            </div>
            <div className="city_region">
              <button
                onClick={() => clickToBtn("Львів")}
                className={
                  "city_region-btn " +
                  (city.Description === "Львів" ? "active" : "")
                }
              >
                Львів
              </button>
            </div>
          </div>
          <label htmlFor="city" className="city_label">
            Вкажіть населений пункт України
          </label>
          <div className="city_wrap-lists">
            <input
              autoComplete="off"
              type="text"
              placeholder="Важіть населений пункт"
              name="searchCity"
              className="city_input"
              id="city"
              onKeyUp={findCity}
              value={value.searchCity}
              onChange={handleChange}
            />
            <p className="city_error">{error}</p>
            <ul className={"city_lists " + (cities.length ? "active" : "")}>
              {cities.map((city) => (
                <li
                  key={city.CityID}
                  className="city_list"
                  onClick={() => handleCity(city)}
                >
                  {city.Description} - {city.AreaDescription} Обл.
                </li>
              ))}
            </ul>
          </div>
          <p className="city_example">
            Наприклад,<span> Котюжини</span>{" "}
          </p>
          <p className="city_message">
            Вибір міста допоможе надати актуальну інформацію про наявність
            товару, його ціни та методів доставки у вашому місті! Це допоможе
            зберегти більше вільного часу для вас!
          </p>
        </div>
      </div>
    </div>
  );
};

export default City;
