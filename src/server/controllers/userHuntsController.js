const { Pool } = require("pg");
const db = require("../models/model.js");

const userHuntsController = {};

//create
// signUpForHunt(user_id, hunt_id)
userHuntsController.signUpForHunt = (req, res, next) => {
  const params = [req.body.user_id, req.body.hunt_id];
  const queryText =
    "INSERT INTO public.userhunts (user_id, hunt_id) VALUES ($1, $2);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};

//read
// getAllUsersSignedUpForHunt(hunt_id)
userHuntsController.getAllUsersSignedUpForHunt = (req, res, next) => {
  const params = [req.params.hunt_id];
  const queryText = "SELECT * FROM public.userhunts WHERE hunt_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// getAllUsersDoingHunt(hunt_id)
userHuntsController.getAllUsersDoingHunt = (req, res, next) => {
  const params = [req.params.hunt_id];
  const queryText = "SELECT * FROM public.userhunts WHERE hunt_id = $1 AND progress = 'started';";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// getAllUsersCompletedHunt(hunt_id)
userHuntsController.getAllUsersCompletedHunt = (req, res, next) => {
  const params = [req.params.hunt_id];
  const queryText = "SELECT * FROM public.userhunts WHERE hunt_id = $1 AND progress = 'completed';";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};


//update
// startHunt(user_id, hunt_id)
userHuntsController.startHunt = (req, res, next) => {
  const params = [req.body.user_id, req.params.hunt_id];
  const queryText =
    "UPDATE public.userhunts SET progress = 'started' WHERE user_id = $1 AND  hunt_id = $2;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.users = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// completeHunt(user_id, hunt_id)
userHuntsController.completeHunt = (req, res, next) => {
  const params = [req.body.user_id, req.params.hunt_id];
  const queryText =
    "UPDATE public.userhunts SET progress = 'completed' WHERE user_id = $1 AND  hunt_id = $2;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.users = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = userHuntsController;
