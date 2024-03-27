import { useDispatch, useSelector } from "react-redux";
import "./pageProduct.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getColorArrById } from "../../store/color";
import { getMemoryById } from "../../store/memory";
import { getCharacteristicById } from "../../store/characteristic";
import { Button } from "../../ui/button";
import Reviews from "../../ui/reviews/reviews";
import { getIphone, getPhoneById, loadIphoneList } from "../../store/iphone";
import { loadUserById } from "../../store/user";
import { getLocalStorageUser } from "../../utils/localStorage";
import { getColorFromUrl } from "../../utils/utils";
import { getComment } from "../../store/comment";

const PageProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const comments = useSelector(getComment);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [btnState, setBtnState] = useState("characteristic");
  const iphone = useSelector(getPhoneById(id));
  const phones = useSelector(getIphone);
  const color = getColorFromUrl(iphone?.image);
  const colors = useSelector((state) => getColorArrById(state, iphone?.color));
  const memory = useSelector(getMemoryById(iphone?.built_inMemory));
  const characteristic = useSelector(
    getCharacteristicById(iphone?.characteristicsIphone)
  );

  const isLoading = iphone && colors && characteristic && color;

  useEffect(() => {
    dispatch(loadIphoneList());
    if (getLocalStorageUser()) {
      dispatch(loadUserById(getLocalStorageUser()));
    }
  }, [id]);
  const pathToColor = (col) => {
    const path = phones.phone.find((item) => {
      const colorFromUrl = getColorFromUrl(item.image).trim();
      const isSilver = colorFromUrl === "grey" || colorFromUrl === "silver";

      if (
        iphone.series === item.series &&
        iphone.built_inMemory === item.built_inMemory
      ) {
        console.log(colorFromUrl, col.name);
      }
      if (
        (isSilver ? "silver" : colorFromUrl === col.name.trim()) &&
        iphone.series === item.series &&
        iphone.built_inMemory === item.built_inMemory
      ) {
        console.log(colorFromUrl, col.name);
        return item;
      }
    });
    if (path) {
      navigate(`/product/${path._id}`);
    }
  };
  const showReviews = () => {
    window.scroll({
      top: 800,
      behavior: "smooth",
    });
    setBtnState("reviews");
  };
  const ratingSum =
    comments && comments.length > 0
      ? Math.ceil(
          comments.reduce((acc, item) => acc + item.rating, 0) / comments.length
        )
      : 0;
  const num = 5 - ratingSum;
  const unStar = [...Array(num)].map((start, index) => ++index);
  const starts = [...Array(ratingSum)].map((start, index) => ++index);
  console.log(unStar, num);
  return !isLoading ? (
    <div className="spinner-container">
      <RotatingLines ariaLabel="three-dots-loading" strokeColor="#f6a9c3" />
    </div>
  ) : (
    <div className="product wrapper">
      <h2 className="product_title">
        Сматфон Apple {iphone.series} {memory?.memory}
      </h2>

      <div className="product_container">
        <div className="product_view">
          <Swiper
            style={{
              "--swiper-navigation-color": "rgba(126, 126, 126, 0.33)",
              "--swiper-pagination-color": "rgba(126, 126, 126, 0.33)",
            }}
            spaceBetween={0}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            <SwiperSlide>
              <img src={iphone?.image} className="mySwiper-slider" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={iphone?.image} className="mySwiper-slider" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={iphone?.image} className="mySwiper-slider" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={iphone?.image} className="btswiper-slider" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={iphone?.image} className="btswiper-slider" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={iphone?.image} className="btswiper-slider" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="product_model">
          <div className="product_price">
            {iphone.discountedPrice}&#8372;&nbsp;&nbsp;
            <span className="product_price-bad">{iphone.price}&#8372;</span>
          </div>
          <div className="product_reviews">
            {starts &&
              starts.map((i) => (
                <span className="product_star-gold" key={i}>
                  &#9733;
                </span>
              ))}
            {unStar &&
              unStar.map((i) => (
                <span key={i} className="product_star">
                  &#9733;
                </span>
              ))}

            <span onClick={showReviews} className="product_reviews-text">
              Дивитися відгуки
            </span>
          </div>
          <div className="product_characteristic">
            <div className="product_colors">
              {colors &&
                colors.map((item) => (
                  <span
                    key={item._id}
                    onClick={() => pathToColor(item)}
                    className={
                      `product_color-wrap ` +
                      (color === item.name ? "active" : "")
                    }
                  >
                    <span
                      className="product_color"
                      style={{ background: `rgb(${item.rgb})` }}
                    ></span>
                  </span>
                ))}
            </div>
            <div className="product_characteristic-builtmemory">
              Вбудована памї'ять :<span>{memory?.memory}</span>
            </div>
            <div className="product_characteristic-rammemory">
              {" "}
              Оперативна памї'ять :{characteristic?.CPU?.appleSeries}
            </div>
            <div className="product_characteristic-screen">
              {" "}
              Екран :{characteristic?.display?.screenDiagonal}
            </div>
          </div>
          <Button className="product_btn">Купити</Button>
        </div>
      </div>
      <div className="about">
        <button
          className={
            "about_btn" + (btnState === "characteristic" ? " active" : "")
          }
          onClick={() => setBtnState("characteristic")}
        >
          Характеристики
        </button>
        <button
          className={"about_btn" + (btnState === "reviews" ? " active" : "")}
          onClick={() => setBtnState("reviews")}
        >
          Відгуки
        </button>

        <div
          className={
            "about_characteristic " +
            (btnState === "characteristic" ? "active" : "")
          }
        >
          <div className="about_characteristic-text">
            <div className="about_wrap">
              <span className="about_prop">Екран</span>
              <span className="about_value">
                {characteristic?.display?.screenDiagonal}&nbsp;
                {characteristic?.display?.displayResolution}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Вбудована пам'ять (ROM)</span>
              <span className="about_value">{memory?.memory}</span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Матеріал екрана</span>
              <span className="about_value">
                {characteristic?.display?.screenMaterial}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Діагональ екрану</span>
              <span className="about_value">
                {characteristic?.display?.screenDiagonal}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Частота оновлення екрана</span>
              <span className="about_value">
                {characteristic?.display?.screenRefreshRate}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Роздільна здатність дисплея</span>
              <span className="about_value">
                {characteristic?.display?.displayResolution}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Операційна система</span>
              <span className="about_value">
                {characteristic?.operatingSystem}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Навігація</span>
              <span className="about_value">{characteristic?.navigation}</span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Основні функції камери</span>
              <span className="about_value">
                {characteristic?.mainCamera?.mainCameraFeatures}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Розташування основної камери</span>
              <span className="about_value">
                {characteristic?.mainCamera?.mainCameraPlacement}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Відеозапис основної камери</span>
              <span className="about_value">
                {characteristic?.mainCamera?.mainCameraVideoRecording}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">Основний тип спалаху</span>
              <span className="about_value">
                {characteristic?.mainCamera?.mainFlashType}
              </span>
            </div>
            <div className="about_wrap">
              <span className="about_prop">
                Кількість мегапікселів основної камери
              </span>
              <span className="about_value">
                {characteristic?.mainCamera?.numberOfMegapixelsOfTheMainCamera}
              </span>
            </div>
          </div>
        </div>
        <div
          className={"about_reviews" + (btnState === "reviews" ? "active" : "")}
        >
          {" "}
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default PageProduct;
