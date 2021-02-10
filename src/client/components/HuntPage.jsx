import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EventListItem from './EventListItem';

const HuntPage = (props) => {

    const { id } = useParams();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCmu-FkYYE9ggu-4iiJe2PfLvi-86lsx7Y'
    });
    const [map, setMap] = useState(null);

    const onMapLoad = useCallback(map => {
        setMap(map);
    }, []);

    const onMapUnmount = useCallback(map => {
        setMap(null);
    }, [])

    /*
     * Begin Stub Data
     */
    const center = {
        lat: 30.4882,
        lng: -97.7618
    }
    const events = [{
        title: 'Shakespeare Bar',
        description: '$7 pitchers and that weird Austin vibe. Take a picture with the ice cream truck.',
        pos: {
            lat: 30.2674331,
            lng: -97.7419488
        }
    },
    {
        title: 'The Jackalope',
        description: 'Take a picture with the DJ.',
        pos: {
            lat: 30.2671304,
            lng: -97.7411892
        }
    }]
    /*
     * End Stub Data
     */

    return (
        <>
            <Link to='/hunts'>back to Hunts</Link>
            <h1>Hunt Page {id}</h1>
            {
                isLoaded ?
                    <GoogleMap zoom={12} mapContainerStyle={{ height: '500px', width: '100%' }} center={center} onLoad={onMapLoad} onUnmount={onMapUnmount}>
                        {
                            events.map(event => <Marker position={event.pos} />)
                        }
                    </GoogleMap>
                    : <p>loading map...</p>
            }
            <div className='list-item-section'>
                {
                    events.map(event => <EventListItem title={event.title} description={event.description} />)
                }
            </div>
        </>
    )
}

export default HuntPage;