import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import EventListItem from './EventListItem';
import axios from 'axios';
import { AppContext } from './ContextProvider';
import PhotoInfoWindow from './PhotoInfoWindow';

const HuntPage = (props) => {
    const { id } = useParams();

    const { hunts, events, setEvents } = useContext(AppContext)
    const [ currentHunt, setCurrentHunt ] = useState('');
    const [map, setMap] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const location = useLocation(); //to add user location
    const center = { lat: 30.2674331, lng: -97.7419488 } //stub data

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
    
    useEffect(() => {
        axios(`http://localhost:3000/api/events/getEventsByHunt/${id}`)
            .then(res => {

                setEvents(res.data.map(event => {
                    return {
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
//merge conflict head
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.API_KEY
    });
 //merge conflict tail
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

    const uploadPhotoHandler = async (file, id) => {
        const { event_pos, event_name, event_riddle } = events.find(event => event.event_id === id);
        const { lat, lng } = event_pos;

        // Placeholder code to simulate upload photo asynchronously
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })

        // Request all Photo urls for this event from API
        const urls = await requestPhotos(id);
        // TODO Once, the above line actually returns URLs, replace the prop value photoUrls with the urls array...
        setSelectedEvent(<PhotoInfoWindow onCloseClick={() => { setSelectedEvent(null) }} lat={lat} lng={lng} title={event_name} description={event_riddle} photoUrls={[URL.createObjectURL(file), URL.createObjectURL(file), URL.createObjectURL(file)]}/>)
    }

    const requestPhotos = (eventId) => {
        // Placeholder code to simulate requesting photos asynchronously
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([ /*STUB HOSTED IMAGE URLS*/]);
            }, 2000);
        })
    }
//merge conflict head
    /*
     * Placeholder Center...
     * TODO Calculate the center of the map dynamically based on all pins...
     */
    const center = {
        lat: 30.2674331,
        lng: -97.7419488
    }
//merge conflict tail
    return (
        <>
            <Link to='/hunts'>back to Hunts</Link>
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
            <Link to={"/createevent/" + id}>Create Event</Link>
           
        </>
    )
}

export default HuntPage;