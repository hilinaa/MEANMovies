const Mongoose = require("mongoose");

const moviesSchema = new Mongoose.Schema({
  title: String,
  duration: Number,
  year: Number,
  actors: [String],
  director: {
    dname: String,
    dage: Number,
  },
});

Mongoose.model("Movie", moviesSchema, "movies");
