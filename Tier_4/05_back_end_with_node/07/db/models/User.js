import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";

import { emailRegexp, subscriptionList } from "../../constants/auth.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: emailRegexp,
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: [...subscriptionList],
    defaultValue: subscriptionList[0],
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync({force: true});

export default User;
