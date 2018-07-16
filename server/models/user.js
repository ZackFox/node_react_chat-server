const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataType.STRING,
        unique: true,
      },
      screenname: DataType.STRING,
      email: {
        type: DataType.STRING,
        unique: true,
      },
      password: DataType.STRING,
      avatar: DataType.STRING,
    },
    { underscored: true },
  );

  // hashing password
  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, 8)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  });

  // instance method to generate hash password
  User.prototype.encryptPassword = password => {
    return bcrypt.hash(password, bcrypt.genSalt(8));
  };

  // instance method to verify password
  User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // m-t-m association User with Room via table
  User.associate = models => {
    User.belongsToMany(models.Room, {
      through: "members",
      foreignKey: {
        name: "userId",
        field: "user_id",
      },
    });
  };

  return User;
};
