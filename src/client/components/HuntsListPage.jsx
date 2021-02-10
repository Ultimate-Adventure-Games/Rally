import axios from 'axios';
import React from 'react';
import { AppContext } from './ContextProvider';

const HuntsListPage = props => {
    // deconstruct huntList and setHuntList from context 
    const {
      hunts, 
      setHunts,
      potentialHunts,
      setPotentialHunts,
      runningHunts,
      setRunningHunts,
      completedHunts,
      setCompletedHunts,
      user,
      userLat,
      userLng,
    } = useContext(AppContext);

    /**
     * useEffect hook 
     * axios call to get top hunts  
     * setHuntList  
     * 2nd arg should be user location  
     */
    
    // const userCoords = {
    //   userLat,
    //   userLng,
    // }

    useEffect(() => {
      // TODO confirm endpoint
      axios(`http://localhost:3000/getAllHunts/`)
      // TODO determine if the data is already sorted by votes -- if not, sort 
        .then(res => setHunts(res.data))
        .catch(err => console.log('GET Error retrieving all hunts in the area'))

      
    })



    // declare empty huntList array 
    const huntList = [];
    // loop and push to array a HuntListItem component 
    hunts.forEach(huntObj => {
      // FIXME not the most efficient time complexity -- fix later 
      // FIXME add didUserVote property in order to prevent double-counting
      // TODO confirm format of completedHunts object 
      /**
       * userHuntStatus -> 
       * 3 = completed 
       * 2 = running
       * 1 = potential 
       * = 0 not signed up 
       */
      if (completedHunts.includes(huntObj.hunt_name)) huntObj.userHuntStatus = 3;
      else if (runningHunts.includes(huntObj.hunt_name)) huntObj.userHuntStatus = 2;
      else if (potentialHunts.includes(huntObj.hunt_name)) huntObj.userHuntStatus = 1;
      else huntObj.userHuntStatus = 0;
      huntList.push(
        <HuntListItem
        className=""
        key={huntObj.hunt_id}
        huntObj={huntObj}>
        </HuntListItem>
      )
    })

    return(
        <div className="huntList">
            <h1>Hunt List Page</h1>
            <div ></div>
        </div>
    );

}

export default HuntsListPage;