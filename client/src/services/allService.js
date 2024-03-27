import axios from "axios";
import api, { API_URL } from ".";
import {
  setLocalStorageToken,
  setLocalStorageUser,
} from "../utils/localStorage";

export default class AllService {
  static async searchStreet(strCity, strStreet) {
    const city = await axios.get(
      `https://api.dmsolutions.com.ua:2661/api/Cities?sRequest=${strCity}&sLang=ru_RU`,
      {
        headers: {
          Authorization:
            "Bearer EV2kktNuRDUdN0H-7Gqyzy8JZNXAfdR5948EXlAGQS8D-fuYj-7OVPeZ4DGXuY81JtpqS_ebiP6CddBZJn96gHBMpcPWTadS_KLZvJ_rHGHtf-xW2WTsLhtFEyTL-Z-NZ_2T6-QtiE8g9IBvxv2b3rA-A8H_voeBYpJFxiilav7IdBTTPQ2_Vzt35zEjYhPCzhYdb0SyPlBbLo5tLcf8r6s0jocxn_c3EI5kJ0rogjGnjs68ru4WFdxPAhE_NDnTvvqroGvu-V5SC21pOZhshG13Hq6oNcP9avHO-rSbmjy0vt4pTuytP9fPulE3DiPjyowP61uu5n2ZutmoF5JxoFlQsVz_V3tBZvakM_TK86GYYTji7sjJJTYTDmjJLVA1frVhLR7qHursEOFJfh04uQ4ZrU5-5eWvHI3SkzHW6uv6roHhPMVB74FkKf34Lg2wkssDChwBoqkTXMK0y0wfAqICl1XkkF9Y23uDd5u2iCJn3gy811MLBxaHnYg6LgsC",
        },
      }
    );
    const { data } = await axios.get(
      `https://api.dmsolutions.com.ua:2661/api/Streets?sRequest=${strStreet}&stMoniker=${city.data[0].st_moniker}&sLang=uk_UA`,
      {
        headers: {
          Authorization:
            "Bearer EV2kktNuRDUdN0H-7Gqyzy8JZNXAfdR5948EXlAGQS8D-fuYj-7OVPeZ4DGXuY81JtpqS_ebiP6CddBZJn96gHBMpcPWTadS_KLZvJ_rHGHtf-xW2WTsLhtFEyTL-Z-NZ_2T6-QtiE8g9IBvxv2b3rA-A8H_voeBYpJFxiilav7IdBTTPQ2_Vzt35zEjYhPCzhYdb0SyPlBbLo5tLcf8r6s0jocxn_c3EI5kJ0rogjGnjs68ru4WFdxPAhE_NDnTvvqroGvu-V5SC21pOZhshG13Hq6oNcP9avHO-rSbmjy0vt4pTuytP9fPulE3DiPjyowP61uu5n2ZutmoF5JxoFlQsVz_V3tBZvakM_TK86GYYTji7sjJJTYTDmjJLVA1frVhLR7qHursEOFJfh04uQ4ZrU5-5eWvHI3SkzHW6uv6roHhPMVB74FkKf34Lg2wkssDChwBoqkTXMK0y0wfAqICl1XkkF9Y23uDd5u2iCJn3gy811MLBxaHnYg6LgsC",
        },
      }
    );
    return data;
  }
  static async bigData(latitude, longitude) {
    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
    );
    return data;
  }
  static async nvGetCity(city) {
    const { data } = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "8e7d09a04b36630c8bca617bb11d1dea",
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {
        FindByString: city,
      },
    });
    return data;
  }
  static async nvDepartmentCargo(description) {
    const { data } = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "8e7d09a04b36630c8bca617bb11d1dea",
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        TypeOfWarehouseRef: "9a68df70-0267-42a8-bb5c-37f427e36ee4",
        CityName: description,
        FindByString: "Відділення",
      },
    });

    return data;
  }
  static async nvDepartmentDepartment(description) {
    const { data } = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "8e7d09a04b36630c8bca617bb11d1dea",
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        TypeOfWarehouseRef: "6f8c7162-4b72-4b0a-88e5-906948c6a92f",
        CityName: description,
        FindByString: "Відділення",
      },
    });

    return data;
  }
  static async deleteComment(payload) {
    const { data } = await api.delete("/comment", { params: payload });
    return data;
  }

  static async createComment(payload) {
    const { data } = await api.post("/comment", payload);
    return data;
  }

  static async getComment(id) {
    const { data } = await api.get("/comment/" + id);
    return data;
  }

  static async registration(payload) {
    const { data } = await api.post("/registration", { ...payload });
    localStorage.setItem("token", data.accessToken);
    return data;
  }

  static async login(payload) {
    const { data } = await api.post("/login", { ...payload });
    localStorage.setItem("token", data.accessToken);
    return data;
  }

  static async checkAuth() {
    const { data } = await axios.get(API_URL + "/refresh", {
      withCredentials: true,
    });
    if (data) {
      setLocalStorageUser(JSON.stringify(data.user?._id).replaceAll('"', ""));
      setLocalStorageToken(data.accessToken);
    }
    return data;
  }
  static async getUserById(id) {
    const { data } = await api.get(`/user/${id}`);
    return data;
  }
  static async getProd(query) {
    const { data } = await api.get(`/prod/?${query}`);
    return data;
  }
  static async getIphoneName() {
    const { data } = await api.get(`/iphoneName`);
    return data;
  }
  static async getIphoneById(id) {
    const { data } = await api.get("/iphone/" + id);
    return data;
  }
  static async getColor() {
    const { data } = await api.get("/color");
    return data;
  }
  static async getColorById(id) {
    const { data } = await api.get("/color/" + id);
    return data;
  }

  static async addBasketNv(payload) {
    const { data } = await api.post("/basketNv/", payload);
    return data;
  }
  static async addBasketCourier(payload) {
    const { data } = await api.post("/basketCourier/", payload);
    return data;
  }

  static async getMemory() {
    const { data } = await api.get("/memory");
    return data;
  }
  static async getMemoryById(id) {
    const { data } = await api.get("/memory/" + id);
    return data;
  }
  static async getCharacteristic() {
    const { data } = await api.get("/characteristic");
    return data;
  }
  static async getCharacteristicById(id) {
    const { data } = await api.get("/characteristic/" + id);
    return data;
  }
}
