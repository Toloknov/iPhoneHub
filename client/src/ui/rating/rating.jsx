import "./rating.scss";
const Rating = ({ setRating, setHover, rating, hover, errors }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((star, index) => {
        index++;
        return (
          <button
            type="button"
            className={
              "rating_button " + (index <= (hover || rating) ? "on" : "off")
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            key={index}
          >
            <span className="rating_star">&#9733;</span>
          </button>
        );
      })}
      {errors?.rating && (
        <div className="rating_error">{errors?.rating.msg}</div>
      )}
    </div>
  );
};

export default Rating;
