import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import TokenService from "./tokenService.js";
import { v4 as uuidv4 } from "uuid";
import MailService from "./mailService.js";
import ApiError from "../exception/errorException.js";
import Phone from "../models/Phone.js";
import Basket from "../models/Basket.js";
import Color from "../models/Color.js";
import Comment from "../models/Comment.js";
import CharacteristicsIphone from "../models/CharacteristicsIphone.js";
import BuiltInMemory from "../models/BuiltInMemory.js";
import fs from "fs";
import { log } from "console";
class UserService {
  async authGoogle(profile) {}
  async registration(email, password, rest) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest("Пользователь с таким емейл уже существует");
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const activationLink = uuidv4();
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
      image: `https://robohash.org/${(Math.random() + 1)
        .toString(36)
        .substring(7)}?set=set3`,
      ...rest,
    });

    await MailService.passMail(
      user.email,
      `http://localhost:8000/api/activate/${activationLink}`
    );
    const token = await TokenService.createToken({ _id: user._id });
    await TokenService.saveToken(user._id, token.refreshToken);
    return { user, ...token };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest("Пользователь с таким email не существует", {
        email: { msg: "Email is not correct" },
      });
    }

    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      throw ApiError.badRequest("Не правильный пароль", {
        password: { msg: "Password is not correct" },
      });
    }
    const tokens = TokenService.createToken({ _id: user._id });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    if (!token) {
      throw ApiError.badRequest("Чтобы выйти надо зайти )");
    }
    return token;
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest("Пользователь с таким ссылкай нет");
    }
    user.isActivated = true;
    await user.save();
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = await TokenService.verifyRefreshToken(refreshToken);
    const token = await TokenService.findToken(refreshToken);

    if (!userData || !token) {
      throw ApiError.unauthorized();
    }

    const tokens = await TokenService.createToken({ _id: userData._id });
    await TokenService.saveToken(userData._id, tokens.refreshToken);
    return { user: userData, ...tokens };
  }
  async getUser(userId) {
    if (!userId) {
      throw ApiError.unauthorized();
    }
    const user = await User.findOne({ _id: userId });
    return user;
  }
  async getProd(options) {
    const query = {
      series: { $regex: `.*${options.text}.*` },
    };
    const brand = await Phone.find(query).distinct("type");
    const uniqMemory = await Phone.find(query).distinct("built_inMemory");

    if (options.brand) {
      query.type = options.brand;
    }

    if (options.memory) {
      query.built_inMemory = options.memory;
    }
    const uniqPhone = await Phone.find(query).distinct("series");

    if (options.fields) {
      const phone = await Phone.find(query).sort(
        options.price && {
          discountedPrice: options.price === "за зростанням ціни" ? -1 : 1,
        }
      );

      return {
        phone,
        memory: uniqMemory,
        iphoneName: uniqPhone,
        brand,
      };
    } else {
      const phone = await Phone.find(query).sort(
        options.price && {
          discountedPrice: options.price === "за зростанням ціни" ? -1 : 1,
        }
      );
      return {
        phone,
        memory: uniqMemory,
        iphoneName: uniqPhone,
        brand,
      };
    }
  }
  async getIphoneName() {
    const phone = await Phone.distinct("series");
    return phone;
  }
  async getIphoneById(id) {
    const phone = await Phone.findOne({ _id: id });
    return phone;
  }
  async getColor() {
    const colors = await Color.find();
    return colors;
  }
  async getColorById(id) {
    const color = await Color.findOne({ _id: id });
    return color;
  }
  async getCharacteristics() {
    const characteristic = await CharacteristicsIphone.find();
    return characteristic;
  }
  async getCharacteristicById(id) {
    const characteristic = await CharacteristicsIphone.findOne({ _id: id });
    return characteristic;
  }
  async getMemory() {
    const characteristic = await BuiltInMemory.find();
    return characteristic;
  }
  async getMemoryById(id) {
    const characteristic = await BuiltInMemory.findOne({ _id: id });
    return characteristic;
  }

  async addBasket(payload) {
    const {
      name,
      email,
      phone,
      products,
      user,
      cityOrVillage,
      department,
      street,
      house,
      apartment,
      floor,
      lift,
      data,
      time,
    } = payload;

    const basket = await Basket.create({
      name: name,
      email: email,
      phone: phone,
      products: products,
      user: user,
      cityOrVillage: cityOrVillage,
      department: department,
      street: street,
      house: house,
      apartment: apartment,
      floor: floor,
      lift: lift,
      data: data,
      time: time,
    });

    return basket;
  }
  async createComment(payload) {
    const comment = await Comment.create({
      user: payload.user,
      productId: payload.productId,
      text: payload.text,
      rating: payload.rating,
    });
    return comment;
  }
  async getComment(productId) {
    const comment = await Comment.find({
      productId: productId,
    });
    return comment;
  }
  async removeComment(user, idComment, productId) {
    const comment = await Comment.findOneAndDelete({
      user: user,
      _id: idComment,
    });
    const comments = await Comment.find({ productId: productId });
    return comments;
  }
}

export default new UserService();
