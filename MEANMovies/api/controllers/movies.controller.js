const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

module.exports.getAllMovies = function (req, res) {
  Movie.find().exec(function (err, movie) {
    const response = { status: 200, message: movie };
    if (err) {
      console.log("error finding Movies");
      response.status = 500;
      response.message = err;
    } else {
      console.log("found movies", movie);
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.getOneMovie = function (req, res) {
  const movieId = req.params.movieId;
  Movie.findById(movieId).exec(function (err, movie) {
    const response = { status: 200, message: movie };
    if (err) {
      console.log("error finding Movies");
      response.status = 500;
      response.message = err;
    } else {
      console.log("found movie", movie);
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addOneMovie = function (req, res) {
  if (
    req.body.title &&
    req.body.duration &&
    req.body.year &&
    req.body.dname &&
    req.body.dage
  ) {
    if (
      isNaN(req.body.dage) &&
      isNaN(req.body.year) &&
      isNaN(req.body.duration)
    ) {
      console.log("age, duration and year should be a number");
      return;
    }
    const newMovie = {};
    const director = { dname: req.body.dname, dage: parseInt(req.body.dage) };
    newMovie.title = req.body.title;
    newMovie.duration = parseFloat(req.body.duration);
    newMovie.year = parseInt(req.body.year);
    newMovie.actors = [];
    newMovie.director = director;

    Movie.create(newMovie, function (err, movie) {
      const response = { status: 200, message: movie };
      if (err) {
        console.log("error adding Movie");
        response.status = 500;
        res.message = err;
      } else {
        console.log("Movie successfully added", movie);
      }
      res.status(response.status).json(response.message);
    });
  } else {
    res.status(500).json({ message: "Please provide all the fields" });
  }
};
module.exports.deleteOneMovie = function (req, res) {
  console.log("deleting movie");

  const movieId = req.params.movieId;
  Movie.findByIdAndDelete(movieId).exec(function (err, movie) {
    const response = { status: 200, message: movie };
    if (err) {
      console.log("error deleting Movie");
      response.status = 500;
      response.message = err;
    } else {
      console.log("Movie successfully deleted", movie);
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.updateOneMovie = function (req, res) {
  console.log("updating movie");
  const movieId = req.params.movieId;
  Movie.findById(movieId).exec(function (err, movie) {
    const response = { status: 200, message: movie };
    if (err) {
      console.log("error deleting Movie");
      response.status = 500;
      response.message = err;
    } else {
      if (req.body.dname && req.body.dage && !isNaN(req.body.dage)) {
        const director = {
          dname: req.body.dname,
          dage: parseInt(req.body.dage),
        };
        movie.director = director;
      }
      if (req.body.title) {
        movie.title = req.body.title;
      }
      if (req.body.duration && !isNaN(req.body.duration)) {
        movie.duration = parseFloat(req.body.duration);
      }
      if (req.body.year && !isNaN(req.body.year)) {
        movie.year = parseInt(req.body.year);
      }

      //movie.actors = [];
      // movie.director = director;
      movie.save(function (err, movie) {
        if (err) {
          console.log(err);
          response.status = 500;
          response.message = err;
        }
      });
      res.status(response.status).json(response.message);
      console.log("Movie successfully updated", movie);
    }
  });
};
