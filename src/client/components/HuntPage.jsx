import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import EventListItem from './EventListItem';
import axios from 'axios';
import { AppContext } from './ContextProvider';

const HuntPage = (props) => {
    const { id } = useParams();

    const {
      hunts
    } = useContext(AppContext)

    const [currentHunt, setCurrentHunt] = useState('');

    useEffect(() => {
      for (const hunt of hunts) {
        console.log(id, hunt.hunt_id);
        if (hunt.hunt_id == id) {
          console.log('EQUALS')
          setCurrentHunt(hunt.hunt_name)
          break
        }
      }
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY

    });
    const location = useLocation();

    const [map, setMap] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [events, setEvents] = useState([]);

    useEffect(() => {
      axios(`http://localhost:3000/api/events/getEventsByHunt/${id}`)
        .then(res => {
          
          setEvents(res.data.map(event => {
            return  {
              ...event,
              event_pos: {
                lat: event.event_lat,
                lng: event.event_long,
              }
            }
          }))
        })
        .catch(err => console.log('GET Error retrieving all hunts in the area'))
    }, [])
    
    
    
    const onMapLoad = useCallback(map => {
        setMap(map);
    }, []);

    const onMapUnmount = useCallback(map => {
        setMap(null);
    }, [])

    const onSelectEventHandler = id => {
        if (!map) return;
        const { event_pos, event_name, event_riddle } = events.find(event => event.event_id === id);
        const { lat, lng } = event_pos;
        setSelectedEvent(<InfoWindow onCloseClick={() => { setSelectedEvent(null) }} position={{ lat, lng }}><><h3>{event_name}</h3><div>{event_riddle}</div></></InfoWindow>)
        map.setCenter({ lat, lng })
    };

    const uploadPhotoHandler = (file, id) => {
        const { event_pos, event_name, event_riddle } = events.find(event => event.event_id === id);
        const { lat, lng } = pos;
        setSelectedEvent(<InfoWindow onCloseClick={() => { setSelectedEvent(null) }} position={{ lat, lng }}><><h3>{event_name}</h3><div>{event_riddle}</div><div><img style={{ width: '50%', height: '50%' }} src={URL.createObjectURL(file)} /></div></></InfoWindow>)
    }

    /*
     * Begin Stub Data
     */
    const center = {
        lat: 30.2674331,
        lng: -97.7419488
    }
    
    //#region  
    // const events = [{
    //     id: 0,
    //     title: 'Shakespeare Bar',
    //     description: '$7 pitchers and that weird Austin vibe. Take a picture with the ice cream truck.',
    //     pos: {
    //         lat: 30.2674331,
    //         lng: -97.7419488
    //     }
    // },
    // {
    //     id: 1,
    //     title: 'The Jackalope',
    //     description: 'Take a picture with the DJ.',
    //     pos: {
    //         lat: 30.2671304,
    //         lng: -97.7411892
    //     }
    // },
    // {
    //     id: 2,
    //     title: 'YETI Austin Flagship',
    //     description: 'Didn\'t know the cooler brand had a bar? Cross the river to see it. Take a picture with the yeti.',
    //     pos: {
    //         lat: 30.2593641,
    //         lng: -97.7485306,
    //     }
    // }]
    /*
     * End Stub Data
     */
    //#endregion 

    return (
        console.log('CURRENT HUNT', currentHunt),
        <>
            <Link to='/hunts'>back to Hunts</Link>
            {/* <h1>{location.state.huntName}</h1> */}
            <h1>{currentHunt}</h1>
            {
                isLoaded ?
                    <GoogleMap zoom={16} mapContainerStyle={{ height: '500px', width: '100%' }} center={center} onLoad={onMapLoad} onUnmount={onMapUnmount}>
                        {/* Load Markers */}
                        {
                            events.map(event => <Marker key={event.event_id} position={event.event_pos} />)
                        }
                        {
                            selectedEvent ? selectedEvent : <></>
                        }
                    </GoogleMap>
                    : <p>loading map...</p>
            }
            <div className='list-item-section'>
                {
                    events.map(event => <EventListItem key={event.event_id} id={event.event_id} title={event.event_name} uploadPhotoHandler={uploadPhotoHandler} description={event.event_riddle} onSelect={onSelectEventHandler.bind(this, event.event_id)} />)
                }
            </div>
        </>
    )
}

export default HuntPage;