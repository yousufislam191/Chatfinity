const getUser = (req, res, next) => {
  return res.render("users");
};

module.exports = {
  getUser,
};
