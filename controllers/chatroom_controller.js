const { findUser } = require("./utils");

const getChatPage = async (req, res) => {
  try {
    const user = await findUser(req.session.email);
    res.render("chat", { title: "Chat", username: user.firstName, clientCode: "chatFunction.js" });
  } catch (error) {
    console.error("Error fetching chat page:", error);
    res.redirect("/error");
  }
};

module.exports = {
  getChatPage,
};
