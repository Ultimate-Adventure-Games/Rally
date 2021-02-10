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
//get specific hunt, set hunt_id
router.get("/hunts/:hunt_id", huntsController.getHunt, (req, res) => {
    return res.status(200).json(res.locals.hunt)
})

//get all hunts
router.get("/hunts", huntsController.getHunts, (req, res) => {
  return res.status(200).json(res.locals.hunts);
});


//-----------------------------------EVENTS-------------------------------
//-------GET-----
//get specific event, set event_id
router.get("/events/:event_id", eventsController.getEvent, (req, res) => {
  return res.status(200).json(res.locals.event)
})

//get all events by hunt, set hunt_id
router.get("/events/hunt/:hunt_id", eventsController.getEvents, (req, res) => {
  return res.status(200).json(res.locals.events)
})


//------POST-----
//create event, set event_name event_index event_lat event_long event_riddle hunt_id
router.post("/events", eventsController.createEvent, (req, res) => {
  return res.status(200).send("successfully created event");
});


//-----------------------------------PHOTOS-------------------------------
//-------GET-----
//get photos by event, set event_id
router.get("/photos/:event_id", photosController.getPhotos, (req, res) => {
    return res.status(200).json(res.locals.photos)
})


//------POST-----
//get photos by event_id and user_id (verify they completed)
router.post("/photos/getPhotoByUserAndEvent", photosController.getPhotoByUserAndEvent, (req, res) => {
  return res.status(200).send(res.locals.photo);
});

//create photo, set user_id event_id photo_src
router.post("/photos/addPhoto", photosController.addPhoto, (req, res) => {
  return res.status(200).send("successfully created photo");
});

module.exports = router;