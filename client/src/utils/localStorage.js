export const getLocalStoragePage = () => localStorage.getItem("page");
export const setLocalStoragePage = (payload) =>
  localStorage.setItem("page", JSON.stringify(payload));

export const getLocalStorageCity = () => localStorage.getItem("city");
export const setLocalStorageCity = (payload) =>
  localStorage.setItem("city", JSON.stringify(payload));

export const removeLocalStorageToken = () => localStorage.removeItem("token");
export const getLocalStorageToken = () => localStorage.getItem("token");
export const setLocalStorageToken = (payload) =>
  localStorage.setItem("token", payload);

export const removeLocalStorageUser = () => localStorage.removeItem("user");
export const getLocalStorageUser = () => localStorage.getItem("user");
export const setLocalStorageUser = (payload) =>
  localStorage.setItem("user", payload);

export const getLocalStorageBasket = () => {
  if (localStorage.getItem("basket")) {
    return localStorage.getItem("basket");
  } else {
    return null;
  }
};
export const removeLocalStorageBasketAll=()=>localStorage.removeItem("basket")
export const removeLocalStorageBasket = (id) => {
  const getBasket = JSON.parse(localStorage.getItem("basket"));
  const removeProduct = getBasket.filter((item) => item._id !== id);
  return localStorage.setItem("basket", JSON.stringify(removeProduct));
};
export const setLocalStorageBasket = (payload, sign) => {
  const getBasket = localStorage.getItem("basket");
  if (!getBasket) {
    return localStorage.setItem("basket", JSON.stringify([payload]));
  } else if (!sign) {
    return localStorage.setItem(
      "basket",
      JSON.stringify([...JSON.parse(getBasket), payload])
    );
  } else if (sign === "plus") {
    return localStorage.setItem(
      "basket",
      JSON.stringify(
        [...JSON.parse(getBasket)].map((item) => {
          if (item._id === payload._id) {
            item.col++;
          }
          return item;
        })
      )
    );
  } else if (sign === "minus") {
    return localStorage.setItem(
      "basket",
      JSON.stringify(
        [...JSON.parse(getBasket)].map((item) => {
          if (item._id === payload._id) {
            item.col--;
          }
          return item;
        })
      )
    );
  }
};
