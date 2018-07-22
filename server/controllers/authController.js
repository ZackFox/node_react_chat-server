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

authController.signUp = async (req, res) => {
  const { username, screenname, email, password, passwordConfirm } = req.body;
  const errors = {};

  if (username === "") {
    errors.username = "Поле не заполнено";
  } else {
    const isUsernameExist = await User.findOne({ where: { username } });
    if (isUsernameExist) {
      errors.username = "Ник уже занят";
    }
  }

  if (screenname === "") {
    errors.screenname = "Поле не заполнено";
  }

  if (email === "") {
    errors.email = "Поле не заполнено";
  } else if (!email.includes("@")) {
    errors.email = "Не верный формат";
  } else {
    const isEmailExist = await User.findOne({ where: { email } });
    if (isEmailExist) {
      errors.email = "Email уже занят";
    }
  }

  if (password === "") {
    errors.password = "Поле не заполнено";
  } else if (password.length < 5) {
    errors.password = "Пароль короткий";
  }

  if (passwordConfirm === "") {
    errors.passwordConfirm = "Поле не заполнено";
  } else if (passwordConfirm !== password) {
    errors.passwordConfirm = "Пароли не совпадают";
  }

  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  user
    .save()
    .then(newUser => {
      res.status(200).json({ status: "ok", user: newUser });
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
