import { Router } from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";
import upload from "..//middlewares/upload.js";

import authenticate from "../middlewares/authenticate.js";

import {
  authRegisterSchema,
  authVerifySchema,
  authLoginSchema,
} from "../schemas/authSchemas.js";

import {
  register,
  verify,
  resendVerify,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(authRegisterSchema),
  ctrlWrapper(register)
);

authRouter.post(
  "/verify",
  validateBody(authVerifySchema),
  ctrlWrapper(resendVerify)
);

authRouter.get("/verify/:verificationToken", ctrlWrapper(verify));

authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(login));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.patch(
  "/subscription",
  authenticate,
  ctrlWrapper(updateSubscription)
);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  ctrlWrapper(updateAvatar)
);

export default authRouter;
