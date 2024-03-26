import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import { getColorArrById, getColorStatus } from "../../store/color";
import { getMemoryById } from "../../store/memory";
import { Link, useNavigate } from "react-router-dom";
import { addToBasket, getBasket } from "../../store/basket";
import { getCharacteristicStatus } from "../../store/characteristic";
import { getIphone } from "../../store/iphone";
import { getColorFromUrl } from "../../utils/utils";

const CatalogWrap = ({ iphone }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phones = useSelector(getIphone);
  const colors = useSelector((state) => getColorArrById(state, iphone?.color));
  const memory = useSelector(getMemoryById(iphone.built_inMemory));
  const color = getColorFromUrl(iphone.image);
  const basket = useSelector(getBasket);

  const isLoadingCharacteristic = useSelector(getCharacteristicStatus);
  const isLoadingColor = useSelector(getColorStatus);

  const basketHandle = (payload) => {
    dispatch(addToBasket(payload));
  };

  const checkDisabled =
    basket && basket.some((item) => item._id === iphone._id);

  const pathToColor = (col) => {
    const path = phones.phone.find((item) => {
      const colorFromUrl = getColorFromUrl(item.image).trim();
      const isSilver = colorFromUrl === "grey" || colorFromUrl === "silver";

      if (
        (isSilver ? "silver" : colorFromUrl === col.name.trim()) &&
        iphone.series === item.series &&
        iphone.built_inMemory === item.built_inMemory
      ) {
        return item;
      }
    });
    if (path) {
      navigate(`/product/${path._id}`);
    }
  };
  return (
    !isLoadingCharacteristic &&
    memory &&
    !isLoadingColor &&
    colors &&
    color && (
      <div className="catalog_wrap">
        <Link to={`/product/${iphone._id}`}>
          <img
            src={iphone.image}
            alt="card"
            className="catalog_img"
            loading="lazy"
          />
        </Link>
        <div className="catalog_about">
          <div className="catalog_colors">
            {colors.map((item) => (
              <span
                key={item._id}
                onClick={() => pathToColor(item)}
                className={
                  `catalog_color-wrap ` + (color === item.name ? "active" : "")
                }
              >
                <span
                  className="catalog_color"
                  style={{
                    background: `rgb(${item.rgb}) `,
                  }}
                ></span>
              </span>
            ))}
          </div>
          <div className="catalog_desc">
            <Link to={`/product/${iphone._id}`} className="catalog_desc-link">
              {iphone.series +
                " " +
                color[0].toUpperCase() +
                color.slice(1) +
                " " +
                memory.memory}
            </Link>
          </div>
          <div className="catalog_down">
            <div className="catalog_price">
              <span className="catalog_price-norm">
                {iphone.price} <span> &#8372;</span>
              </span>
              <span className="catalog_price-discount">
                {iphone.discountedPrice} <span> &#8372;</span>
              </span>
            </div>
            <Button
              disabled={checkDisabled}
              handleClick={() => basketHandle(iphone)}
            >
              {checkDisabled ? "В кошику" : "Купити"}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CatalogWrap;
