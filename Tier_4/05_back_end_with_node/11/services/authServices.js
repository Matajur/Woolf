import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

import { subscriptionList } from "../constants/auth.js";

const { BASE_URL } = process.env;

const createVerificationEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click here for the email verification</a>`,
  };
};

export const findUser = (query) => User.findOne({ where: query });

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) return null;

  return user.update(data, { returning: true });
};

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...payload,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = createVerificationEmail(email, verificationToken);

  await sendEmail(verifyEmail);

  return newUser;
};

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  return user.update(
    { verificationToken: null, verify: true },
    { returning: true }
  );
};

export const resendVerifyEmail = async (email) => {
  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = createVerificationEmail(email, user.verificationToken);

  return await sendEmail(verifyEmail);
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = createToken({ email });
  await user.update(
    { token },
    {
      returning: true,
    }
  );

  return { token: token, user: user };
};

export const logoutUser = async (query) => {
  return updateUser(query, { token: null });
};

export const modifySubscription = async (payload) => {
  const { id, subscription } = payload;

  if (!subscriptionList.includes(subscription)) {
    throw HttpError(400, "Invalid subscription type");
  }

  return updateUser({ id }, { subscription });
};

export const modifyAvatar = async (payload) => {
  const { id, avatarURL } = payload;

  return updateUser({ id }, { avatarURL });
};
