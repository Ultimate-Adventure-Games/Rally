import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AppContext } from './ContextProvider';
import HuntListItem from './HuntListItem';

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

    // useEffect(() => {
    //   // TODO confirm endpoint
    //   axios(`http://localhost:3000/getAllHunts/`)
    //   // TODO determine if the data is already sorted by votes -- if not, sort 
    //     .then(res => setHunts(res.data))
    //     .catch(err => console.log('GET Error retrieving all hunts in the area'))

      
    // })

// DUMMY OBJECT
    const huntsTest = [
    {
      hunt_id: 1,
      hunt_name: 'Alcatraz Hunt',
      hunt_votes: 65,
      hunt_splash: '',
      hunt_lat: 37.8270,
      hunt_long: -122.4230,
      // FIXME is there a separate hunt row entry for every user? 
      user_id: 1234,
    },
    {
      hunt_id: 2,
      hunt_name: 'Ultimate SF Hunt',
      hunt_votes: 50,
      hunt_splash: '',
      hunt_lat: 30.2674331,
      hunt_long: -97.7419488,
      // FIXME is there a separate hunt row entry for every user? 
      user_id: 1234,
    },
]






    // declare empty huntList array 
    const huntList = [];
    // loop and push to array a HuntListItem component 
    // TODO switch back to hunts Context array
    huntsTest.forEach(huntObj => {
      huntList.push(
        <HuntListItem
        className=""
        key={huntObj.hunt_id}
        huntName={huntObj.hunt_name}
        voteCount={huntObj.hunt_votes}
        linkTo={'/hunt/' + huntObj.hunt_id}
        >
        </HuntListItem>
      )
    })

    return(
      <div className='list-item-section'>{huntList}</div>
    );

}

export default HuntsListPage;