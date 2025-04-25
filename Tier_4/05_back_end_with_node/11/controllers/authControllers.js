import fs from "node:fs/promises";
import path from "node:path";
import gravatar from "gravatar";

import * as authServices from "../services/authServices.js";

const avatarsPath = path.resolve("public/avatars");

export const register = async (req, res) => {
  let avatarURL = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join("avatars", filename);
  } else {
    avatarURL = gravatar.url(req.body.email, { s: "200", d: "retro" }, true);
  }

  const result = await authServices.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

export const verify = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyUser(verificationToken);

  res.json({
    message: "Verification successful",
  });
};

export const resendVerify = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerifyEmail(email);

  res.json({
    message: "Verification email sent",
  });
};

export const login = async (req, res) => {
  const result = await authServices.loginUser(req.body);

  res.json({
    token: result.token,
    user: {
      email: result.user.email,
      subscription: result.user.subscription,
      avatarURL: result.user.avatarURL,
    },
  });
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser({ id });

  res.status(204).json();
};

export const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const user = await authServices.modifySubscription({ id, subscription });

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const updateAvatar = async (req, res) => {
  const { id } = req.user;
  let avatarURL = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);

    try {
      await fs.rename(oldPath, newPath);
      avatarURL = path.join("avatars", filename);
    } catch (error) {
      await fs
        .unlink(oldPath)
        .catch((err) => console.error("Error deleting file:", err));
      return next(error);
    }
  }

  const result = await authServices.modifyAvatar({ id, avatarURL });

  res.json({
    avatarURL: result.avatarURL,
  });
};
