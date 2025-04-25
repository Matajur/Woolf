import * as authServices from "../services/authServices.js";

export const register = async (req, res) => {
  const result = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const login = async (req, res) => {
  const result = await authServices.loginUser(req.body);

  res.json({
    token: result.token,
    user: {
      email: result.user.email,
      subscription: result.user.subscription,
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
