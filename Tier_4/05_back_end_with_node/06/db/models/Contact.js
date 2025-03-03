import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";

import { phoneRegexp } from "../../constants/contacts.js";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: phoneRegexp,
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Contact.sync({force: true});

export default Contact;
