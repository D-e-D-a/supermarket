const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail,getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password is incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };

  // Use LocalStrategy for handling authentication
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  // Serialize the user to store user ID in session
  passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
  });

  // Deserialize the user by their ID to retrieve the full user object
  passport.deserializeUser((id, done) => {
   return done(null, getUserById(id));
  });
}

module.exports = initialize;

