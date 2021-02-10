# scavenge-hunt

USERS
createUser(username, password)
authUser(username, password)

USER/HUNT JOIN TABLE
getAllUsersSignedUpForHunt(hunt_id)
getAllUsersDoingHunt(hunt_id)
getAllUsersCompletedHunt(hunt_id)

signUpForHunt(user_id, hunt_id)

startHunt(user_id, hunt_id)
completeHunt(user_id, hunt_id)

HUNTS
getHunt(hunt_id)
getAllHunts()

EVENTS
getEvent(event_id)
createEvent(user_id, hunt_id)
getEvents(hunt_id)

PHOTOS
createPhoto(user_id, event_id)
getPhotosByEvent(event_id)
getPhotoByUserAndEvent(event_id, user_id) (verify if you completed event or not)