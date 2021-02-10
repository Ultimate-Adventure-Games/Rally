const { Pool } = require("pg");
const db = require("../models/model.js");

const usersController = {};

//create
// createUser(username, password)
usersController.createUser = (req, res, next) => {
  const params = [req.body.user_name, req.body.password];
  const queryText =
    "INSERT INTO public.users (user_name, password) VALUES ($1, $2);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};

//read
usersController.getUser = (req, res, next) => {
  const params = [req.params.user_id];
  const queryText = "SELECT * FROM public.users WHERE user_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

usersController.getAllUsers = (req, res, next) => {
  const queryText = "SELECT * FROM public.users LIMIT 100;";

  //promise based syntax
  db.query(queryText)
    .then((result) => {
      res.locals.users = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

//authenticate name/password combo
// authUser(username, password)
usersController.userAuth = (req, res, next) => {
  const params = [req.params.user_name, req.params.user_password]
  const queryText = "SELECT * FROM public.users WHERE user_name = $1 AND password = $2;";
  db.query(queryText, params)
  .then(result => {
    res.locals.user = result.rows
    return next();
  })
  .catch((err) => next(err));
}

module.exports = usersController;
