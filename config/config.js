require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 5001,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/chatfinity",
  },
};
module.exports = dev;
