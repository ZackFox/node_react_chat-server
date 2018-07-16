("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "messages",
      [
        {
          user_id: 1,
          room_id: 1,
          text: "Привет здесь",
        },
        {
          user_id: 2,
          room_id: 2,
          text: "Привет, люди",
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("messages", null, {});
  },
};
