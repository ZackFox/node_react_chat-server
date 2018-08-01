const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const models = require("./server/models");
const routes = require("./server/routes");

const app = express();

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public/")));

app.use("/api/v1", routes);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

models.sequelize
  .authenticate()
  .then(
    () => console.log(`Sequelize connected to database`),
    err => console.error("Unable to connect to the database:", err),
  );

const server = http.createServer(app);

server.listen(app.get("port"), () => {
  console.log(`Server is started on port ${app.get("port")}`);
});

// soceket init and save
const io = require("./server/socket")(server);
app.set("io", io);

// models.sequelize.sync().then(() => {
//   app.listen(app.get("port"), () => {
//     console.log(`Server is started on port ${app.get("port")}.`);
//   });
// });
