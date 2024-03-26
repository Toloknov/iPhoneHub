import "./toggler.scss";
import upArrow from "../../assets/images/icons/up-arrow.svg";
import { useCallback } from "react";
const Toggler = ({
  items,
  setCheckbox,
  checkbox,
  setStateToggler,
  stateToggler,
  name,
  label,
}) => {
  const chooseFilter = useCallback(
    (item) => {
      if (name === "price") {
        setCheckbox((prev) => {
          return {
            ...prev,
            [name]:
              item === "за зростанням ціни"
                ? "за зростанням ціни"
                : "за зменьшенням ціни",
          };
        });
      } else if (name === "memory" || name === "brand") {
        if (name === "brand") {
          setCheckbox({
            name: "",
            memory: "",
            price: "",
            brand: "",
          });
        }
        setCheckbox((prev) => {
          return {
            ...prev,
            [name]: prev[name] !== item._id ? item._id : "",
          };
        });
      } else if (name === "name") {
        setCheckbox((prev) => {
          return {
            ...prev,
            [name]: item,
          };
        });
      }
    },
    [name, setCheckbox]
  );
  const clickReset = () => {
    setCheckbox((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
  };
  return (
    <>
      <button
        type="button"
        className="toggler_toggler"
        onClick={() =>
          setStateToggler((prev) => ({
            ...prev,
            [name]: !stateToggler,
          }))
        }
      >
        {label}
        <img
          className={stateToggler ? "active" : ""}
          src={upArrow}
          alt="up-arrow"
        />{" "}
      </button>
      <ul className={"toggler_names " + (stateToggler ? "active" : "")}>
        {items &&
          items.map((item) => (
            <li
              key={item._id || item}
              className="toggler_name"
              onClick={() => chooseFilter(item)}
            >
              <label htmlFor={item.memory || item} className="toggler_label">
                <span
                  className={
                    "toggler_fake " +
                    (checkbox === (item._id || item) ? "active" : "")
                  }
                ></span>
                <input
                  type="checkbox"
                  id={item.memory || item}
                  className="toggler_input"
                />
                {item.memory || item}
              </label>
            </li>
          ))}
        <button className="toggler_btn" onClick={clickReset}>
          Скидання
        </button>
      </ul>
    </>
  );
};

export default Toggler;
