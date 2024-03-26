import "./basket.scss";
import basket from "../../assets/images/icons/basket.svg";

import BasketProd from "../basketProd/basketProd";
import { addSpaceNumber } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
const Basket = ({ active, setActive, baskets }) => {
  const navigate = useNavigate();
  const checkout = () => {
    setActive(false);
    navigate("/checkout");
  };
  const allPrice =
    baskets &&
    addSpaceNumber(
      baskets.reduce((prev, item) => {
        return (
          prev + Number(item?.discountedPrice.split(" ").join("")) * item.col
        );
      }, 0)
    );
  return (
    <div
      className={"basket " + (active ? "active" : "")}
      onClick={() => setActive(false)}
    >
      <div
        className={"basket_view " + (active ? "active" : "")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="basket_top">
          <div className="basket_title">Кошик</div>
          <button
            className="basket_cross"
            onClick={() => setActive(false)}
          ></button>
        </div>
        {baskets < 1 ? (
          <div className="basket_content">
            <img
              src={basket}
              alt="basket"
              loading="lazy"
              className="basket_img"
            />
            <h3 className="basket_subtitle">Кошик порожній</h3>
            <p className="basket_text">Але це ніколи не пізно виправити :)</p>
          </div>
        ) : (
          <div className="basket_products">
            {baskets &&
              baskets.map((prod) => (
                <BasketProd
                  key={prod._id + (Math.random() + 1).toString(36).substring(7)}
                  product={prod}
                />
              ))}
            <div className="basket_design-wrap">
              <div className="basket_design-panel">
                <button
                  className="basket_btn-next"
                  onClick={() => setActive(false)}
                >
                  Продовжити покупки
                </button>
                <div className="basket_design">
                  <span className="basket_all-price">
                    {allPrice}
                    <span className="basket_grn">&#8372;</span>
                  </span>
                  <button className="basket_btn" onClick={checkout}>
                    Оформити замовлення
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
