import "./comment.scss";
import { getUserById, setUserById } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

const Comment = ({ comment, onRemove }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserById(comment.user));
  useEffect(() => {
    if (comment.user) {
      dispatch(setUserById(comment.user));
    }
  }, [comment]);

  return (
    user && (
      <li className="comment">
        <div className="comment_wrap">
          <img src={user.image} alt="avtars" className="comment_img" />
          <div className="comment_box">
            <div className="comment_name">{user.name}</div>
            <div className="comment_time">
              {moment(comment.createdAt).format("D.M.YYYY в H:m")}
            </div>
          </div>
          <div className="comment_container">
            {[...Array(5)].map((star, index) => {
              index++;
              return (
                <button type="button" className="comment_button" key={index}>
                  <span
                    className={
                      "comment_star " + (comment.rating >= index ? "on" : "")
                    }
                  >
                    &#9733;
                  </span>
                </button>
              );
            })}
            <button
              className="comment_cross"
              onClick={() =>
                onRemove({
                  user: user._id,
                  idComment: comment._id,
                  productId: comment.productId,
                })
              }
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="comment_path"
                  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                  fill="#159a4c"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="comment_text">{comment.text}</div>
      </li>
    )
  );
};

export default Comment;
