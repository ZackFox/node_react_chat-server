const path = require("path");
// const http = require("http");
// const server = http.createServer(app);
const io = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const models = require("./server/models");
const routes = require("./server/routes");

const app = express();

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

models.sequelize
  .authenticate()
  .then(() => {
    console.log(`Sequelize connected to database`);
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(app.get("port"), () => {
  console.log(`Server is started on port ${app.get("port")}`);
});

// app.use("/", (req,res) => {
//   res.renderFile("");
// });

// models.sequelize.sync().then(() => {
//   app.listen(app.get("port"), () => {
//     console.log(`Server is started on port ${app.get("port")}.`);
//   });
// });
