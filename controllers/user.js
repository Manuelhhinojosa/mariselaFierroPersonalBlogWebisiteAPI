const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await new User({ username: username, password: hashedPassword });
  await user
    .save()
    .then((response) => {
      console.log(response);
      const newUser = response;
      res.status(201).json(newUser);
    })
    .catch((error) => {
      console.log("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "User not found" });
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(500).json("Username or password incorrect");
    } else {
      res.status(200).json(user);
      console.log("User logged in");
    }
  }
};

module.exports = {
  createUser,
  loginUser,
};
