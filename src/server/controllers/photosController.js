const { Pool } = require("pg");
const db = require("../models/model.js");

const photosController = {};

//create
// createPhoto(user_id, event_id)
photosController.createPhoto = (req, res, next) => {
  const params = [req.body.user_id, req.body.event_id];
  const queryText =
    "INSERT INTO public.photos (user_id, event_id) VALUES ($1, $2);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};

//read
// getPhotosByEvent(event_id)
photosController.getPhotosByEvent = (req, res, next) => {
  const params = [req.params.event_id];
  const queryText = "SELECT * FROM public.photos WHERE event_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// getPhotoByUserAndEvent(event_id, user_id) (verify if you completed event or not)
photosController.getPhotoByUserAndEvent = (req, res, next) => {
  const params = [req.params.user_id, req.params.event_id];
  const queryText = "SELECT * FROM public.photos WHERE user_id = $1 AND event_id = $2;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = photosController;
