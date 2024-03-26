import { useDispatch, useSelector } from "react-redux";
import "./basketProd.scss";
import { getMemoryById } from "../../store/memory";
import { Link, useLocation } from "react-router-dom";
import { addToBasket, deleteBasketById } from "../../store/basket";
import { addSpaceNumber } from "../../utils/utils";
const BasketProd = ({ product }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const memory = useSelector(getMemoryById(product.built_inMemory));

  const deleteProd = (prodId) => {
    dispatch(deleteBasketById(prodId));
  };
  const basketHandle = (payload, sign) => {
    dispatch(addToBasket(payload, sign));
  };
  const price = addSpaceNumber(
    Number(product?.price.split(" ").join("")) * product.col
  );
  const discountedPrice = addSpaceNumber(
    Number(product?.discountedPrice.split(" ").join("")) * product.col
  );
  return (
    memory && (
      <div className="prod">
        <div className="prod_top">
          <Link to={`/product/${product._id}/${search}`}>
            <img src={product.image} alt="prod" className="prod_img" />
          </Link>
          <Link to={`/product/${product._id}`}>
            <p className="prod_title">
              {product.series +
                memory.memory}
            </p>
          </Link>
          <button className="prod_btn" onClick={() => deleteProd(product._id)}>
            {" "}
            <span className="prod_point"></span>
            <span className="prod_point"></span>
            <span className="prod_point"></span>
          </button>
        </div>
        <div className="prod_bottom">
          <div className="prod_added">
            <button
              className="prod_minus"
              disabled={product.col <= 1}
              onClick={() => basketHandle(product, "minus")}
            ></button>
            <div className="prod_box">{product.col}</div>
            <button
              className="prod_plus"
              disabled={product.col >= product.amount}
              onClick={() => basketHandle(product, "plus")}
            ></button>
          </div>
          <div className="prod_prices">
            <div className="prod_discount">{price}&#8372;</div>
            <div className="prod_price">
              {discountedPrice}
              &#8372;
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BasketProd;
