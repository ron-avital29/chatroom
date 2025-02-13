const { Contact } = require("../models/contact");
const bcrypt = require("bcrypt");

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

const emailAlreadyInDataBase = async (email) => {
  const user = await Contact.findOne({ where: { email } });
  return user !== null;
};

const findUser = async (email) => {
  const user = await Contact.findOne({ where: { email } });
  if (user) {
    return { firstName: user.firstName, email: user.email };
  }
  return null;
};

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
