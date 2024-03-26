export function getData(data, search = "") {
  if (search) {
    return data.filter((item) => {
      if (item.series.toLowerCase().indexOf(search.toLowerCase()) > 0) {
        return item;
      }
    });
  } else {
    return data;
  }
}
export function queryParser(query) {
  return query
    .map((value) => {
      return `${value[0] || ""}=${value[1] || ""}`;
    })
    .toString()
    .replaceAll(",", "&");
}

export const addSpaceNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export function findMinMaxPrice(products) {
  if (!products || products.length === 0) {
    return { maxPrice: null, minPrice: null };
  }

  let maxPrice = -Infinity;
  let minPrice = Infinity;

  for (const product of products) {
    const price = +product.discountedPrice.replace(" ", "");

    if (typeof price !== "number") {
      continue;
    }

    if (price > maxPrice) {
      maxPrice = price;
    }

    if (price < minPrice) {
      minPrice = price;
    }
  }

  return { maxPrice, minPrice };
}
export function removeDuplicateObjects(arr, arg) {
  const uniqueCombos = new Set();
  const result = [];
  if (arg === "phone") {
    for (const obj of arr) {
      const combo = obj.series + "-" + obj.built_inMemory;
      if (!uniqueCombos.has(combo)) {
        uniqueCombos.add(combo);
        result.push(obj);
      }
    }
  } else if (arg === "brand") {
    for (const obj of arr) {
      if (obj === "65faeeebd67bd15f190ab166") {
        result.push({ _id: "65faeeebd67bd15f190ab166", memory: "iPhone" });
      }
      if (obj === "66012bfcaa78c97879bb2e04") {
        result.push({ _id: "66012bfcaa78c97879bb2e04", memory: "Nokia" });
      }
      if (obj === "66013982aa78c97879bb2e0c") {
        result.push({ _id: "66013982aa78c97879bb2e0c", memory: "Samsung" });
      }
    }
  }
  return result;
}
export function getColorFromUrl(url) {
  if (url) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const [color] = lastPart.split(".");
    return color;
  }
}
export function firstWord(str) {
  return str.slice(0, str.indexOf(" "));
}
