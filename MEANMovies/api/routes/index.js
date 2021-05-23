const express = require("express");
const router = express.Router();
const controllerMovies = require("../controllers/movies.controller");
const controllerDirector = require("../controllers/director.controller");
const controllerActors = require("../controllers/actor.controller");
router
  .route("/movies")
  .get(controllerMovies.getAllMovies)
  .post(controllerMovies.addOneMovie);

router
  .route("/movies/:movieId")
  .get(controllerMovies.getOneMovie)
  .delete(controllerMovies.deleteOneMovie)
  .patch(controllerMovies.updateOneMovie);

router
  .route("/movies/:movieId/director")
  .get(controllerDirector.getMovieDirector)
  .post(controllerDirector.addMovieDirector)
  .patch(controllerDirector.updateMovieDirector)
  .delete(controllerDirector.deleteMovieDirector);

router
  .route("/movies/:movieId/actors")
  .get(controllerActors.getAllActors)
  .delete(controllerActors.deleteOneActor)
  .post(controllerActors.addOneActor);

module.exports = router;
