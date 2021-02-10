import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
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
      hunt_name: 'Chris D Austin Ultimate',
      hunt_votes: 65,
      hunt_pplGoing: 12,
      hunt_splash: '',
      pos: {
        lat: 30.2674331,
        lng: -97.7419488
      },
      // FIXME is there a separate hunt row entry for every user? 
      user_id: 1234,
    },
    {
      hunt_id: 2,
      hunt_name: 'South by Southwest',
      hunt_votes: 50,
      hunt_pplGoing: 7,
      hunt_splash: '',
      pos: {
        lat: 30.2674331,
        lng: -97.7453488
      },
      // FIXME is there a separate hunt row entry for every user? 
      user_id: 1234,
    },
]

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY
        
    });


    const [map, setMap] = useState(null);

    const center = {
      lat: 30.2674331,
      lng: -97.7419488
    }

    const onMapLoad = useCallback(map => {
      setMap(map);
  }, []);

    const onMapUnmount = useCallback(map => {
      setMap(null);
    }, [])




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


    const MapIcon = hunt => (
      // <>
        <Marker position={hunt.pos}>
          <InfoWindow 
          visible={true}
          >
            <div className="huntMapInfo">
              <div>{hunt.hunt_name}</div>
              <div>{hunt.hunt_pplGoing} People Going!</div>
              <div>{hunt.hunt_votes} Total Votes!</div>
            </div> 
          </InfoWindow>
        </Marker>
      // </>
    )

    

    return(
      <div className='huntListContainer'>
        <h1>Scavenger Hunts in Your Area!</h1>
          {
            isLoaded ?
                <GoogleMap zoom={16} mapContainerStyle={{ height: '500px', width: '100%' }} center={center} onLoad={onMapLoad} onUnmount={onMapUnmount}>
                    {/* Load Markers */}
                    {
                        huntsTest.map(hunt => (
                          <div>
                          <Marker position={hunt.pos}>
                            <InfoWindow 
                            visible={true}
                            >
                              <div className="huntMapInfo">
                                <h4 className="huntMapInfoName">{hunt.hunt_name}</h4>
                                <div>{hunt.hunt_pplGoing} People Going!</div>
                                <div>{hunt.hunt_votes} Total Votes!</div>
                              </div> 
                            </InfoWindow>
                          </Marker>
                          </div>
                          ))
                          
                          
                    }
                    
                </GoogleMap>
                : <p>loading map...</p>
          }
        <div className='list-item-section'>{huntList}</div>
        <Link to="/createhunt">Create Hunt</Link>
      </div>
    );

}

export default HuntsListPage;