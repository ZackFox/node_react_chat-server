("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "rooms",
      [
        {
          name: "Common",
          screenname: "Общая",
          owner: 1,
        },
        {
          name: "Flood",
          screenname: "Флудильня",
          owner: 2,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("rooms", null, {});
  },
};
