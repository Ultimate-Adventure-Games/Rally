const db = require("../models/model.js");

const photosController = {};

//create
// createPhoto(user_id, event_id)
photosController.createPhoto = (req, res, next) => {
  const params = [req.body.user_id, req.body.event_id, req.body.photo_src];
  const queryText =
    "INSERT INTO public.photos (user_id, event_id, photo_src) VALUES ($1, $2, $3);";

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
      res.locals.photos = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

// getPhotoByUserAndEvent(event_id, user_id) (verify if you completed event or not)
photosController.getPhotoByUserAndEvent = (req, res, next) => {
  const params = [req.body.user_id, req.body.event_id];
  const queryText = "SELECT * FROM public.photos WHERE user_id = $1 AND event_id = $2;";
  
  db.query(queryText, params)
    .then((result) => {
      res.locals.photo = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = photosController;
