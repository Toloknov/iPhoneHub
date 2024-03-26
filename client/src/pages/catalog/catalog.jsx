import { useDispatch, useSelector } from "react-redux";
import {
  getIphone,
  getIphoneStatus,
  loadIphoneList,
} from "../../store/iphone";
import CatalogWrap from "./catalogWrap";
import "./catalog.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Pagination from "../../components/pagination/pagination";
import { queryParser, removeDuplicateObjects } from "../../utils/utils";
import {
  getLocalStoragePage,
  setLocalStoragePage,
} from "../../utils/localStorage";
import { getMemory, getMemoryStatus } from "../../store/memory";
import { Toggler } from "../../ui/toggler";

const Catalog = () => {
  const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(getLocalStoragePage() || 1);
  const [checkbox, setCheckbox] = useState({
    name: "",
    memory: "",
    price: "",
    brand: "",
  });
  const [stateToggler, setStateToggler] = useState({
    name: true,
    memory: true,
    price: true,
    brand: true,
  });

  const dispatch = useDispatch();
  const iphone = useSelector(getIphone);
  const iphoneName = iphone?.iphoneName;

  const isLoadingIphone = useSelector(getIphoneStatus);
  const isLoadingMemory = useSelector(getMemoryStatus);
  const filterMemory = useSelector(getMemory);
  const memory =
    !isLoadingIphone &&
    !isLoadingMemory &&
    filterMemory.filter((item) => {
      return iphone.memory.some((mem) => item._id === mem);
    });

  const limit = 20;
  const uniqBrands =
    !isLoadingIphone && removeDuplicateObjects(iphone.brand, "brand");
  const uniqPhone =
    !isLoadingIphone && removeDuplicateObjects(iphone.phone, "phone");

  const skip = (currentPage - 1) * limit;
  const productCount = !isLoadingIphone && uniqPhone.length;
  const pageArr = Math.ceil(productCount / limit);
  const numbersArray = Array.from(Array(pageArr).keys(), (x) => x + 1);
  const iphoneCurrentState =
    !isLoadingIphone && uniqPhone.slice(skip, skip + limit);
  const commonSearchParams = {
    fields: "series",
    memory: checkbox.memory,
    text: checkbox.name,
    price: checkbox.price,
    brand: checkbox.brand,
  };
  const controlPagination = (page) => {
    setCurrentPage(page);
    setLocalStoragePage(page);
  };


  useEffect(() => {
    setCurrentPage(1);
    setSearchParams([...Object.entries(commonSearchParams)]);
    dispatch(
      loadIphoneList(queryParser([...Object.entries(commonSearchParams)]))
    );
  }, [checkbox]);
  return (
    <>
      {isLoadingIphone && isLoadingMemory ? (
        <div className="spinner-container">
          <RotatingLines ariaLabel="three-dots-loading" strokeColor="#f6a9c3" />
        </div>
      ) : (
        <>
          <div className="catalog">
            <div className="wrapper">
              <div className="catalog_container">
                <div className="catalog_filter">
                  <Toggler
                    label="Ціна"
                    name="price"
                    items={["за зростанням ціни", "за зменьшенням ціни"]}
                    setCheckbox={setCheckbox}
                    checkbox={checkbox.price}
                    setStateToggler={setStateToggler}
                    stateToggler={stateToggler.price}
                  />
                  <Toggler
                    label="Бренд"
                    name="brand"
                    items={uniqBrands}
                    setCheckbox={setCheckbox}
                    checkbox={checkbox.brand}
                    setStateToggler={setStateToggler}
                    stateToggler={stateToggler.brand}
                  />
                  {checkbox.brand && (
                    <Toggler
                      label="Серія"
                      name="name"
                      items={iphoneName}
                      setCheckbox={setCheckbox}
                      checkbox={checkbox.name}
                      setStateToggler={setStateToggler}
                      stateToggler={stateToggler.name}
                    />
                  )}

                  <Toggler
                    label="Вбудована пам'ять"
                    name="memory"
                    items={memory}
                    setCheckbox={setCheckbox}
                    checkbox={checkbox.memory}
                    setStateToggler={setStateToggler}
                    stateToggler={stateToggler.memory}
                  />
                </div>
                <div className="catalog_card">
                  {iphoneCurrentState &&
                    iphoneCurrentState.map((tel) => (
                      <CatalogWrap key={tel._id} iphone={tel} />
                    ))}
                </div>
              </div>
            </div>
          </div>
          {pageArr !== 1 && (
            <Pagination
              items={numbersArray}
              controlPagination={controlPagination}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </>
  );
};

export default Catalog;
