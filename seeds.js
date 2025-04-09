const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/user");

require("./config/database");

const d = new User({
  username: "manuel",
  password: "manuel",
});

d.save()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
