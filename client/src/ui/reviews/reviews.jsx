import { useEffect, useState } from "react";
import { Button } from "../button";
import "./reviews.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getComment,
  getCommentError,
  loadCommentList,
  removeComment,
} from "../../store/comment";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../comment/comment";
import { Rating } from "../../ui/rating";
import { getUser } from "../../store/user";
const Reviews = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [data, setData] = useState("");
  const auth = useSelector(getUser);
  const { id } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector(getCommentError);
  const comments = useSelector(getComment);
  const user = useSelector(getUser);

  const handleChange = (e) => {
    setData(e.target.value);
  };
  const handleRemove = (payload) => {
    dispatch(removeComment(payload));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addComment({
        user: user._id,
        productId: id,
        text: data.trim(),
        rating: rating,
      })
    );
    setData("");
    setRating(0);
    setHover(0);
  };
  const handleAuth = () => {
    if (!auth) {
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(loadCommentList(id));
  }, [id]);
  
  return (
    <>
      <form onSubmit={handleSubmit} className="reviews_form">
        <label htmlFor="area" className="reviews_label">
          Зробити коментарій
          <Rating
            setRating={setRating}
            rating={rating}
            setHover={setHover}
            hover={hover}
            errors={errors}
          />
        </label>
        <div className="reviews_box">
          <textarea
            className="reviews_area"
            name="area"
            value={data}
            onClick={handleAuth}
            onChange={handleChange}
            id="area"
            rows="3"
          ></textarea>
        </div>
        {errors?.text && (
          <div className="reviews_error">{errors?.text.msg}</div>
        )}
        <Button disabled={!data || !rating} className="reviews_btn">
          Відправити
        </Button>
      </form>
      <ul className="reviews_container">
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onRemove={handleRemove}
            />
          ))}
      </ul>
    </>
  );
};

export default Reviews;
