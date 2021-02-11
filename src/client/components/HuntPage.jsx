import { GoogleMap, InfoWindow, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
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
          // setCurrentHunt(hunt.hunt_name)
          window.localStorage.currentHunt = hunt.hunt_name
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
    const [center, setCenter] = useState({
      lat: 30.2674331,
      lng: -97.7419488
    })
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    
    /* array of {lat, lng} objects, in event order for purposes of tracing a polyline */
    const [eventPath, setEventPath] = useState([])

    /**
     * GET request to API to retrieve all event objects within selected hunt 
     */
    useEffect(() => {
      axios(`http://localhost:3000/api/events/getEventsByHunt/${id}`)
        .then(res => {
          console.log(res.data)
          const eventArr = res.data.map(event => {
            const posObj = {
              lat: event.event_lat,
              lng: event.event_long,
            };
            setEventPath(eventPath => [...eventPath, posObj]);
              return {
                ...event,
                event_pos: posObj
              }
          })
          setEvents(eventArr);
        })
        .catch(err => console.log('GET Error retrieving all hunts in the area'))
    }, [])
    
    
    /* Iterate events to size, center, and zoom map to contain all markers  */
    const fitBounds = map => {
      const bounds = new google.maps.LatLngBounds();
      events.map(event => {
        // size bounds accordingly 
        console.log(event.event_pos)
        bounds.extend(event.event_pos);
        return event.event_id;
      })
      // auto-zoom
      map.fitBounds(bounds);
      // FIXME do we also need map.panToBounds?
      // map.panToBounds(bounds);
    }
    
    
    
    const onMapLoad = useCallback(map => {
      console.log(events)
      // Store a reference to the google map instance in state
      setMap(map);
      // Fit map bounds to contain all markers
      
    },[]);

    useEffect(() => {
      console.log(events)
      if (events.length > 0) fitBounds(map);
    }, [events])
    


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
    

    const pathOptions = {
      strokeColor: '#DC7633',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#DC7633',
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
    }
    

    return (
        console.log('CURRENT HUNT', currentHunt),
        <>
            <Link to='/hunts'
            className="btn btn-primary mr-2"
                  type="button"
            >Back to Hunts</Link>
            <h1>{window.localStorage.currentHunt}</h1>
            {
              isLoaded ?
                <GoogleMap 
                  center={center} 
                  // onCenterChanged ={() => setCenter(map.getCenter().toJSON())}
                  zoom={15} 
                  mapContainerStyle={{ height: '500px', width: '100%' }} 
                  onLoad={onMapLoad} 
                  onUnmount={onMapUnmount}>
                { events.map(event => <Marker key={event.event_id} position={event.event_pos} />)}
                {selectedEvent ? selectedEvent : <></>}
                <Polyline
                  path={eventPath}
                  options={pathOptions}
                />
                </GoogleMap>
                : <p>loading map...</p>
            }
            <div className='list-item-section'>
                {
                    events.map(event => <EventListItem key={event.event_id} id={event.event_id} title={event.event_name} uploadPhotoHandler={uploadPhotoHandler} description={event.event_riddle} onSelect={onSelectEventHandler.bind(this, event.event_id)} />)
                }
            </div>
            <Link to={{
                  pathname: '/createevent',
                  state: { id }
                }}
                className="btn btn-primary mr-2"
                type="button"
                >
            Create Event</Link>
            
        </>
    )
}

export default HuntPage;