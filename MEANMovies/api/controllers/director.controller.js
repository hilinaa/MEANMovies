const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.getMovieDirector = function (req, res) {
  const movieId = req.params.movieId;
  console.log("getting director");
  Movie.findById(movieId)
    .select("director")
    .exec(function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error " + err);
        response.status = 500;
        response.message = err;
      }
      console.log("director found");
      res.status(response.status).json(response.message);
    });
};

module.exports.updateMovieDirector = function (req, res) {
  console.log("updating director");
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .select("director")
    .exec(function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error " + err);
        response.status = 500;
        response.message = err;
      } else {
        if (req.body.dname) {
          movie.director = { dname: req.body.dname, dage: movie.director.dage };
        }
        if (req.body.dage && !isNaN(req.body.dage)) {
          movie.director = { dname: movie.director.dname, dage: req.body.dage };
        }
        movie.save(function (err, movie) {
          if (err) {
            console.log("err in save");
            response.status = 500;
            response.message = err;
          }
          response.status = 200;
          response.message = movie;
        });
      }
      res.status(response.status).json(response.message);
    });
};
module.exports.addMovieDirector = function (req, res) {
  console.log("Adding director");
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .select("director")
    .exec(function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error " + err);
        response.status = 500;
        response.message = err;
      } else {
        if (req.body.dname) {
          movie.director = { dname: req.body.dname, dage: "" };
        }
        if (req.body.dage && !isNaN(req.body.dage)) {
          movie.director = { dname: "", dage: req.body.dage };
        }
        movie.save(function (err, movie) {
          if (err) {
            console.log("err in save");
            response.status = 500;
            response.message = err;
          }
          response.status = 200;
          response.message = movie;
        });
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.deleteMovieDirector = function (req, res) {
  const movieId = req.params.movieId;
  console.log("deleting director");
  Movie.findById(movieId).exec(function (err, movie) {
    const response = { status: 200, message: movie };
    if (err) {
      console.log("Error" + err);
      response.status = 500;
      response.message = err;
    }
    movie.director = "";
    movie.save(function (err, movie) {
      if (err) {
        console.log(err);
        response.status = 500;
        response.message = err;
      }
      console.log("sucessfully deleted");
      res.status(response.status).json(response.message);
    });
  });
};
