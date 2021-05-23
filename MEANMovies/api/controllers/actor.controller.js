const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.getAllActors = function (req, res) {
  console.log("getting actors");
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error" + err);
        response.status = 500;
        response.message = err;
      } else {
        console.log("Actors " + movie);
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.addOneActor = function (req, res) {
  console.log("Adding actor");
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error" + err);
        response.status = 500;
        response.message = err;
      } else {
        if (req.body.name) {
          movie.actors.push(req.body.name);
        }
        movie.save(function (err, movie) {
          if (err) {
            console.log("error" + err);
            response.status = 500;
            response.message = err;
          } else {
            console.log("Actor added " + movie);
          }
        });

        res.status(response.status).json(response.message);
      }
    });
};

module.exports.deleteOneActor = function (req, res) {
  console.log("Deleting actor");
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .select("actors")
    .exec(function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error" + err);
        response.status = 500;
        response.message = err;
      } else {
        const actor = req.body.name;
        let i = movie.actors.indexOf(actor);
        movie.actors.splice(i, 1);

        movie.save(function (err, movie) {
          if (err) {
            console.log("error" + err);
            response.status = 500;
            response.message = err;
          }
        });
        res.status(response.status).json(response.message);
        console.log("Actor deleted " + movie);
      }
    });
};
