const { Pool } = require("pg");
const db = require("../models/model.js");

const huntsController = {};

//create
huntsController.createHunt = (req, res, next) => {
  const params = [req.body.hunt_id, req.body.hunt_name];
  const queryText =
    "INSERT INTO public.hunts (first_name, last_name) VALUES ($1, $2);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};

//read
// getHunt(hunt_id)
huntsController.getHunt = (req, res, next) => {
  const params = [req.params.hunt_id];
  const queryText = "SELECT * FROM public.hunts WHERE hunt_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// getAllHunts()
huntsController.getAllHunts = (req, res, next) => {
  const queryText = "SELECT * FROM public.hunts LIMIT 100;";

  //promise based syntax
  db.query(queryText)
    .then((result) => {
      res.locals.users = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = huntsController;
