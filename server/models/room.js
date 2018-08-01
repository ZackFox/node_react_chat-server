module.exports = (sequelize, DataType) => {
  const Room = sequelize.define(
    "room",
    {
      name: {
        type: DataType.STRING,
        unique: true,
      },
      screenname: DataType.STRING,
      owner: DataType.INTEGER,
      private: DataType.BOOLEAN,
      avatar: DataType.STRING,
    },
    // { underscored: true },
  );

  Room.associate = models => {
    Room.belongsToMany(models.User, {
      through: "members",
      foreignKey: {
        name: "roomId",
        field: "room_id",
      },
    });
    Room.belongsTo(models.User, {
      foreignKey: "owner",
    });
  };

  return Room;
};
