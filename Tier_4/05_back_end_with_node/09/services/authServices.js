import bcrypt from "bcrypt";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

import { subscriptionList } from "../constants/auth.js";

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

  const newUser = await User.create({ ...payload, password: hashPassword });
  return newUser;
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
