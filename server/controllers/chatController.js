const { User, Room } = require("../models");

const chatController = {};

chatController.getRooms = (req, res) => {
  const userId = req.user.id;
  Room.findAll({
    attributes: ["id", "name", "screenname", "private", "avatar"],
    include: [
      {
        model: User,
        attributes: [],
        where: {
          id: userId,
        },
      },
    ],
  })
    .then(rooms => {
      return res.status(200).json({ status: "200", rooms });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = chatController;
