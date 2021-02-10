const { Pool } = require("pg");
const db = require("../models/model.js");

const eventsController = {};

//create
// createEvent(user_id, hunt_id)
eventsController.createEvent = (req, res, next) => {
  const params = [req.body.user_id, req.body.hunt_id];
  const queryText =
    "INSERT INTO public.events (user_id, hunt_id) VALUES ($1, $2);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};

//read
// getEvent(event_id)
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

// getEvents(hunt_id)
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
 
  const queryText = "SELECT * FROM public.events";

  db.query(queryText, params)
    .then((result) => {
      res.locals.events = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = eventsController;
