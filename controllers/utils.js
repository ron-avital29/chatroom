const { Contact } = require("../models/contact");
const bcrypt = require("bcrypt");

/**
 * Verifies the user's email and password
 * @param {*} email
 * @param {*} password
 * @returns
 */
const verified = async (email, password) => {
  const user = await Contact.findOne({ where: { email } });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  } else {
    return null;
  }
};

/**
 * Checks if the email is already in the database
 * @param {*} email
 * @returns
 */
const emailAlreadyInDataBase = async (email) => {
  const user = await Contact.findOne({ where: { email } });
  return user !== null;
};

/**
 * Finds a user based on their email
 * @param {*} email
 * @returns
 */
const findUser = async (email) => {
  const user = await Contact.findOne({ where: { email } });
  if (user) {
    return { firstName: user.firstName, email: user.email };
  }
  return null;
};

/**
 * Disconnects the user
 * @param {*} req
 * @param {*} res
 */
const disconnect = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = {
  verified,
  emailAlreadyInDataBase,
  findUser,
  disconnect,
};
