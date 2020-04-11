const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const login = async (req, res, next) => {
  console.log("in login");
  const user = await User.findOne({ username: req.body.username });

  if (!user)
    return res
      .status(400)
      .send({ auth: false, message: "incorrect username or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res
      .status(400)
      .send({ auth: false, message: "incorrect username or password" });

  const payload = (({ _id, username, email }) => ({ _id, username, email }))(
    user
  );

  console.log(payload);
  req.session.user = payload;
  res.status(200).send(payload);
};

const register = async (req, res, next) => {
  console.log(req.body);
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const userDetails = { ...req.body, password: hashedPassword };
  console.log(userDetails);
  try {
    const user = await User.create(userDetails);
    console.log("created");
    console.log(user);
    const payload = (({ _id, username, email }) => ({ _id, username, email }))(
      user
    );
    req.session.user = payload;
    return res.status(200).send(payload);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: true, message: "username or email already exists" });
  }
};

const logout = (req, res, next) => {
  req.session.destroy(() => {
    console.log("user logged out.");
    res.send({ message: "user loggout out" });
  });
};

module.exports = {
  login,
  register,
  logout
};
