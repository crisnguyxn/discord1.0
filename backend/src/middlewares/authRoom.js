const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
require("dotenv").config();
const getToken = (req, res, next) => {
  const app_access_key = process.env.APP_ACCESS_KEY;
  const app_secret = process.env.APP_SECRET;
  let payload = {
    access_key: app_access_key,
    type: "management",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
  };
  const token = jwt.sign(
    payload,
    app_secret,
    {
      algorithm: "HS256",
      expiresIn: "24h",
      jwtid: uuid4(),
    },
  );
  req.signedCookies = token
  next();
};

module.exports = getToken;
