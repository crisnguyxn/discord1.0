const asyncWrapper = require("../middlewares/async");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { handleError } = require("../errors/custom-error");

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return next(handleError("Password must be longer than 6 characters", 401));
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(handleError("Email is already taken", 401));
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const passHashed = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: passHashed };
  const registeredData = await User.create(tempUser);
  res.status(201).json({ registeredData });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(password.length < 6){
    return next(handleError("Password must be longer than 6 characters", 401));
  }
  const tokenRoom = req.signedCookies;
  const user = await User.findOne({ email });
  if (!user) {
    return next(handleError(`User with this email: ${req.body.email} is not existed`, 401));
  }
  const isAuthenticated = await bcrypt.compare(password, user.password);
  if (isAuthenticated) {
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).json({ username:user.name,userId:user._id,token, tokenRoom});
  } else {
    return next(handleError(`Your password is not correct`, 401));
  }
});

module.exports = { register, login };
