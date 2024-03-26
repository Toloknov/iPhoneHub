import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";
import {
  validationDepartment,
  validationLogin,
  validationNv,
  validationRegistration,
  validationReview,
} from "../validation/index.js";

const router = Router();
router.delete("/comment", userController.removeComment);
router.get("/comment/:id", userController.getComment);
router.post("/comment", validationReview,userController.createComment);
router.get("/auth/google", userController.authGoogle);
router.get("/auth/google/callback", userController.authGoogleCallback);
router.post("/registration", validationRegistration, userController.register);
router.post("/login", validationLogin, userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/prod", userController.getProd);
router.get("/iphoneName", userController.getIphoneName);
router.get("/user/:id", userController.getUser);
router.get("/iphone/:id", userController.getIphoneById);
router.get("/color", userController.getColor);
router.get("/color/:id", userController.getColorById);
router.get("/characteristic", userController.getCharacteristics);
router.get("/characteristic/:id", userController.getCharacteristicsById);
router.get("/memory", userController.getMemory);
router.get("/memory/:id", userController.getMemoryById);
router.post("/basketNv", validationDepartment, userController.addBasketNv);
router.post("/basketCourier", validationNv, userController.addBasketCourier);

export default router;
