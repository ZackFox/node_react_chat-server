module.exports = (sequelize, DataType) => {
  const Message = sequelize.define(
    "message",
    {
      userId: {
        type: DataType.INTEGER,
      },
      roomId: {
        type: DataType.INTEGER,
      },
      text: DataType.STRING,
    },
    { underscored: true },
  );

  Message.associate = models => {
    Message.belongsTo(models.Room, {
      foreignKey: {
        name: "roomId",
        field: "room_id",
      },
    });

    Message.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
      },
    });
  };

  return Message;
};
