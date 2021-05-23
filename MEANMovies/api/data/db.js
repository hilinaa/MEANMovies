const mongoose = require("mongoose");
require("./movie-model");
const dbName = "meanMovies";
const url = "mongodb://localhost:27017/" + dbName;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("mongoose disconnected by app termination");
    process.exit(0);
  });
});

process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("mongoose disconnected by app termination");
    process.exit(0);
  });
});

process.once("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("mongoose disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
  });
});

mongoose.connection.on("connected", function () {
  console.log("connected to" + url);
});
mongoose.connection.on("disconnected", function () {
  console.log("disconnected");
});
mongoose.connection.on("err", function (err) {
  console.log("Mongoose disconnected error" + err);
});
