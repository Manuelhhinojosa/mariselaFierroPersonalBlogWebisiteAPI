const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) => {
    console.log("Atlas connection open");
    console.log("this is the result:", result);
  })
  .catch((err) => {
    console.log("Mongo connection error:", err.message);
    process.exit(1); // Exit with failure if connection fails
  });
