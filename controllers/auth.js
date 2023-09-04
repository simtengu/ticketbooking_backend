const { BadRequestError } = require("../errors");
const User = require("../models/user");
const environment = process.env.NODE_ENV;

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  let oneDay = 1000 * 60 * 60 * 24;

  res.cookie("authUser", user.firstName, { maxAge: oneDay });
  res.cookie("jwt", token, { maxAge: oneDay, httpOnly: true });
  // res.cookie("jwt", token, { maxAge: oneDay, httpOnly: true, secure: environment ? true : false })
  res.status(201).json({ message: "user registered", user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide both email and password");
  const user = await User.findOne({ email }).populate("tickets");
  if (!user) throw new BadRequestError("Credentials passed are not valid");
  //compare password of a user............
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new BadRequestError(" Wrong email or password");
  //everything is ok provide a token ..................,,,,
  const token = user.createJWT();
  let oneDay = 1000 * 60 * 60 * 24;

  // res.cookie("authUser", user.firstName, { maxAge: oneDay })
  //   res.cookie("jwt", token, { maxAge: oneDay, httpOnly: true });
  //   res.cookie("jwt", token, { maxAge: oneDay, sameSite: "none", httpOnly: true, secure: environment ? true : false })
  res.cookie("jwt", token, {
    maxAge: oneDay,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ user, token });
};

const logout = (req, res) => {
  let oneSecond = 1000;
  //updating a valid token to invalid one..(short lived)
  res.cookie("jwt", "", {
    maxAge: oneSecond,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ message: "logged out successfully" });
};

const getAuthUser = async (req, res) => {
  const user_id = req.user.id;
  const user = await User.findById(user_id).populate("tickets");
  res.status(200).json({ user });
};

module.exports = { register, login, logout, getAuthUser };

// app.use(session({
//     .......
//    .......
//         cookie:{
//     maxAge: 24 * 60 * 60 * 1000, //please change it based on your needs
//     secure: app.get('env') === 'production' ? true : false,
//     sameSite: 'none'
// }}));
