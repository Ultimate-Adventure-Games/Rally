/* eslint-disable import/prefer-default-export */
import React from 'react';

export const AppContext = React.createContext({
  user: {},
  userLat: {},
  userLng: {},
  hunts: [],
  potentialHunts: [],
  runningHunts: [],
  completedHunts: [],
  events: [],
  setEvents: ()=> {},
  setCurrentUser: () => {},
  setUserLat: () => {},
  setUserLng: () => {},
  setHunts: () => {},
  setPotentialHunts: () => {},
  setRunningHunts: () => {},
  setCompletedHunts: () => {},
});

// this is imported into App.jsx
