const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authController = {};

authController.signIn = (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(403).json({ status: "403", message: "empty_fields" });
  }

  User.findOne({
    where: { email },
    attributes: {},
  })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({ status: "401", message: "user_not_found" });
      } else if (!user.verifyPassword(password)) {
        return res
          .status(403)
          .json({ status: "403", message: "wrong_password" });
      } else {
        const userData = {
          userId: user.id,
          username: user.username,
          screenname: user.screenname,
          email: user.email,
          avatar: user.avatar,
        };
        const token = jwt.sign(userData, "spiderman", { expiresIn: "1h" });

        return res.status(200).json({ status: "200", user: userData, token });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

authController.signUp = (req, res) => {
  const { username, email, password } = req.body;

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  user
    .save()
    .then(newUser => {
      console.log(newUser);
      res.status(200).json({ message: "Done", user: newUser });
    })
    .catch(err => console.log(err));
};

authController.getAuthenticatedUser = (req, res) => {
  const email = req.user.email;

  User.findOne({
    where: { email },
    attributes: ["id", "username", "screenname", "email", "avatar"],
  })
    .then(user => {
      res.json({ user });
    })
    .catch();
};

module.exports = authController;
