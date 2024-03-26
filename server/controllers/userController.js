import ApiError from "../exception/errorException.js";
import UserService from "../services/userService.js";
import { validationResult } from "express-validator";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/User.js";
import tokenService from "../services/tokenService.js";
class UserController {
  async authGoogle(req, res, next) {
    try {
      passport.authenticate("google", { scope: ["email", "profile"] })(
        req,
        res
      );
    } catch (e) {
      next(e);
    }
  }
  async authGoogleCallback(req, res, next) {
    try {
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.Client_ID,
            clientSecret: process.env.Client_Secret,
            callbackURL: "/api/auth/google/callback",
            scope: ["profile", "email"],
          },
          async function (request, accessToken, refreshToken, profile, done) {
            try {
              let user = await User.findOne({ googleId: profile.id });

              if (!user) {
                user = new User({
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  image: profile.picture,
                });
              }
              const tokens = tokenService.createToken({ _id: user._id });
              await tokenService.saveToken(user._id, tokens.refreshToken);
              await user.save();
              res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
              });

              return done(null, user);
            } catch (error) {
              return done(error, null);
            }
          }
        )
      );

      passport.serializeUser((user, done) => {
        done(null, user);
      });
      passport.deserializeUser((user, done) => {
        done(null, user);
      });
      passport.authenticate("google", {
        successRedirect: "http://localhost:5173",
        failureRedirect: "http://localhost:5173/company",
      })(req, res);
    } catch (e) {
      next(e);
    }
  }
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.errors[0].msg, errors.mapped()));
      }
      const { email, password, ...rest } = req.body;
      const data = await UserService.registration(email, password, rest);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("login errors", errors.mapped()));
      }
      const { email, password } = req.body;
      const data = await UserService.login(email, password);
      console.log(data);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const { link } = req.params;
      if (!link) {
        throw new Error("Unauthorized");
      }
      await UserService.activate(link);
      return res.redirect(process.env.URL_CLIENT);
    } catch (e) {
      next(e);
    }
  }
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUser(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async getProd(req, res, next) {
    try {
      const iphone = await UserService.getProd(req.query);
      res.json(iphone);
    } catch (e) {
      next(e);
    }
  }
  async getIphoneName(req, res, next) {
    try {
      
      const iphone = await UserService.getIphoneName();
      res.json(iphone);
    } catch (e) {
      next(e);
    }
  }
  async getIphoneById(req, res, next) {
    try {
      const { id } = req.params;
      const iphone = await UserService.getIphoneById(id);
      res.json(iphone);
    } catch (e) {
      next(e);
    }
  }

  async getColor(req, res, next) {
    try {
      const color = await UserService.getColor();
      res.json(color);
    } catch (e) {
      next(e);
    }
  }

  async getColorById(req, res, next) {
    try {
      const { id } = req.params;
      const color = await UserService.getColorById(id);
      res.json(color);
    } catch (e) {
      next(e);
    }
  }

  async getCharacteristics(req, res, next) {
    try {
      const characteristic = await UserService.getCharacteristics();
      res.json(characteristic);
    } catch (e) {
      next(e);
    }
  }

  async getCharacteristicsById(req, res, next) {
    try {
      const { id } = req.params;
      const characteristic = await UserService.getCharacteristicById(id);
      res.json(characteristic);
    } catch (e) {
      next(e);
    }
  }
  async getMemory(req, res, next) {
    try {
      const memory = await UserService.getMemory();
      res.json(memory);
    } catch (e) {
      next(e);
    }
  }
  async getMemoryById(req, res, next) {
    try {
      const { id } = req.params;
      const memory = await UserService.getMemoryById(id);
      res.json(memory);
    } catch (e) {
      next(e);
    }
  }

  async addBasketNv(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("basket errors", errors.mapped()));
      }

      const basket = await UserService.addBasket(req.body);
      res.json(basket);
    } catch (e) {
      next(e);
    }
  }
  async addBasketCourier(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("basket errors", errors.mapped()));
      }
      const basket = await UserService.addBasket(req.body);
      res.json(basket);
    } catch (e) {
      next(e);
    }
  }
  async createComment(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("basket errors", errors.mapped()));
      }
      const comment = await UserService.createComment(req.body);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
  async getComment(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await UserService.getComment(id);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
  async removeComment(req, res, next) {
    try {
      const { idComment, user, productId } = req.query;
      const comment = await UserService.removeComment(
        user,
        idComment,
        productId
      );
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
