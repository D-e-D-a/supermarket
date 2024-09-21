const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const initializePassport = require("../helpers/passport-config");
const passport = require("passport");

// Initialize Passport with the user retrieval functions
initializePassport(
  passport,
  (email) => User.findOne({ email }), // Use findOne to get a single user by email
  (id) => User.findById(id) // Use findById to get a user by ID
);

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      return res.status(200).json({ message: "Login successful", token, user });
    });
  })(req, res, next);
};

module.exports = {
  register,
  login,
};
