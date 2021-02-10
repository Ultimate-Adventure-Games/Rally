const db = require("../models/model.js");

const eventsController = {};

eventsController.createEvent = (req, res, next) => {
  const params = [req.body.event_name, req.body.event_index, req.body.event_lat, req.body.event_long, req.body.event_riddle, req.body.hunt_id];
  const queryText =
    "INSERT INTO public.events (event_name, event_index, event_lat, event_long, event_riddle, hunt_id) VALUES ($1, $2, $3, $4, $5, $6);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};

eventsController.getEventByEventId = (req, res, next) => {
  const params = [req.params.event_id];
  const queryText = "SELECT * FROM public.events WHERE event_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.event = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

eventsController.getEventByHuntId = (req, res, next) => {
  const params = [req.params.event_id];
  const queryText = "SELECT * FROM public.events WHERE hunt_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.event = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

eventsController.getEvents = (req, res, next) => {
 const params = [req.params.hunt_id]
  const queryText = "SELECT * FROM public.events WHERE hunt_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.events = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = eventsController;
