const getLogin = (req, res, next) => {
  res.render("login", {
    title: "Login - Chatfinity",
  });
};

module.exports = {
  getLogin,
};
