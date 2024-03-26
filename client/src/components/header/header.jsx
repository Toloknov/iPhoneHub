import { useEffect, useState } from "react";
import { NavBar } from "../navigation";
import TopPanel from "../topPanel/topPanel";
import "./header.scss";
import { useSearchParams } from "react-router-dom";
import { queryParser } from "../../utils/utils";
import { loadIphoneList } from "../../store/iphone";
import { useDispatch } from "react-redux";
const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ search: "" });
  const [, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const commonSearchParams = {
    fields: "series",
    text: data.search,
    price: searchParams.get("price") ?? "",
    memory:searchParams.get("memory") ?? "",
    brand: searchParams.get("brand") ?? "",
  };

  useEffect(() => {
    setSearchParams([...Object.entries(commonSearchParams)]);
  }, [data.search]);

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = () => {
    setCurrentPage(1);
    setSearchParams(commonSearchParams);
    dispatch(
      loadIphoneList(queryParser([...Object.entries(commonSearchParams)]))
    );
  };
  return (
    <>
      {" "}
      <header className="header">
        <NavBar />
      </header>
      <TopPanel
        searchValue={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Header;
