require("./api/data/db");
const express = require("express");
const routers = require("./api/routes");
const app = express();

app.use(express.json());
app.set("port", 2000);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", routers);

const server = app.listen(app.get("port"), function () {
  console.log("Listening to port " + server.address().port);
});
