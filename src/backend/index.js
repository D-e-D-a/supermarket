if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.routes");
const userRoute = require("./routes/user.routes");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.get("/", (req, res) => {
  res.send("Hello stranger!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Listening on port 8000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
