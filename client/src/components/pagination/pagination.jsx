import "./pagination.scss";
import arrow from "../../assets/images/icons/arrow.svg";
const Pagination = ({ items, controlPagination, currentPage }) => {
  return (
    <ul className="pagination">
      <li>
        <button
          className={`pagination_btn `}
          disabled={currentPage === 1 && "disabled"}
          onClick={() => controlPagination(currentPage - 1)}
        >
          <img src={arrow} alt="arrow" className="pagination_arrow-left " />
        </button>
      </li>
      {items.map((item) => (
        <li
          key={item}
          className={`pagination_numbers ${
            currentPage === item ? "active" : ""
          }`}
          onClick={() => controlPagination(item)}
        >
          {item}
        </li>
      ))}

      <li>
        <button
          className={`pagination_btn `}
          disabled={currentPage === items[items.length - 1] && "disabled"}
          onClick={() => controlPagination(currentPage + 1)}
        >
          <img src={arrow} alt="arrow" className="pagination_arrow-right" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
