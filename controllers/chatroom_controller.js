const {findUser} = require("./utils");


const getChatPage = async (req, res) => {
    try {
      const user = await findUser(req.session.email);
      res.render("chat", { title: "Chat", username: user.firstName, clientCode: "chatFunction.js" });
    } catch (error) {
      console.error("Error fetching chat page:", error);
      req.flash("error", "Something went wrong. Please try again.");
      res.redirect("/login"); //we need to make an error page to redirect to
    }
  };
  
  const postChatPage = (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  };

  module.exports = {
    getChatPage,
    postChatPage
  };