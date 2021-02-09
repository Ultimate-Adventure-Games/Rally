const express = require("express");
const usersController = require("../controller/usersController.js");
const eventsController = require("../controller/eventsController.js");
const huntsController = require("../controller/huntsController.js");
const userHuntsController = require("../controller/userHuntsController.js");
const photosController = require("../controller/photosController.js");
const router = express.Router();

//-----------------------------------USERS-------------------------------
//-------GET-----
//get route for auth, set body.user_name and body.user_password
router.get("/users/auth/:user_name/:user_password", usersController.userAuth, (req, res) => {
    return res.status(200).json(res.locals.user)
})

//get route for specific user, set user_id param
router.get("/users/:user_id", usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//get route for all users
router.get("/users", usersController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});


//------POST-----
//post route for create user, set body.first_name, last_name, user_name, user_password, user_email, user_location
router.post("/users", usersController.createUser, (req, res) => {
  return res.status(200).send("successfully created user");
});

//post route for update user by id, set body.user_name
router.post("/users/:user_id", usersController.updateUserName, (req, res) => {
  return res.status(200).send("successfully updated user");
});

//----DELETE----
//delete route for delete user by id
router.delete("/users/:user_id", usersController.deleteUser, (req, res) => {
  return res.status(200).send("successfully deleted user");
});

//-----------------------------------USER/HUNTS-------------------------------
//-------GET-----
//get route for auth, set body.user_name and body.user_password
router.get("/users/auth/:user_name/:user_password", usersController.userAuth, (req, res) => {
    return res.status(200).json(res.locals.user)
})

//get route for specific user, set user_id param
router.get("/users/:user_id", usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//get route for all users
router.get("/users", usersController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});


//------POST-----
//post route for create user, set body.first_name, last_name, user_name, user_password, user_email, user_location
router.post("/users", usersController.createUser, (req, res) => {
  return res.status(200).send("successfully created user");
});

//post route for update user by id, set body.user_name
router.post("/users/:user_id", usersController.updateUserName, (req, res) => {
  return res.status(200).send("successfully updated user");
});

//----DELETE----
//delete route for delete user by id
router.delete("/users/:user_id", usersController.deleteUser, (req, res) => {
  return res.status(200).send("successfully deleted user");
});

//-----------------------------------HUNTS-------------------------------
//-------GET-----
//get route for auth, set body.user_name and body.user_password
router.get("/users/auth/:user_name/:user_password", usersController.userAuth, (req, res) => {
    return res.status(200).json(res.locals.user)
})

//get route for specific user, set user_id param
router.get("/users/:user_id", usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//get route for all users
router.get("/users", usersController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});


//------POST-----
//post route for create user, set body.first_name, last_name, user_name, user_password, user_email, user_location
router.post("/users", usersController.createUser, (req, res) => {
  return res.status(200).send("successfully created user");
});

//post route for update user by id, set body.user_name
router.post("/users/:user_id", usersController.updateUserName, (req, res) => {
  return res.status(200).send("successfully updated user");
});

//----DELETE----
//delete route for delete user by id
router.delete("/users/:user_id", usersController.deleteUser, (req, res) => {
  return res.status(200).send("successfully deleted user");
});

//-----------------------------------PHOTOS-------------------------------
//-------GET-----
//get route for auth, set body.user_name and body.user_password
router.get("/users/auth/:user_name/:user_password", usersController.userAuth, (req, res) => {
    return res.status(200).json(res.locals.user)
})

//get route for specific user, set user_id param
router.get("/users/:user_id", usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//get route for all users
router.get("/users", usersController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});


//------POST-----
//post route for create user, set body.first_name, last_name, user_name, user_password, user_email, user_location
router.post("/users", usersController.createUser, (req, res) => {
  return res.status(200).send("successfully created user");
});

//post route for update user by id, set body.user_name
router.post("/users/:user_id", usersController.updateUserName, (req, res) => {
  return res.status(200).send("successfully updated user");
});

//----DELETE----
//delete route for delete user by id
router.delete("/users/:user_id", usersController.deleteUser, (req, res) => {
  return res.status(200).send("successfully deleted user");
});

module.exports = router;