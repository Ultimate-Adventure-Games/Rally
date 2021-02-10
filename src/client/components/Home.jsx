import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';

const Home = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // TODO replace API key with environment variable
        googleMapsApiKey: 'AIzaSyCmu-FkYYE9ggu-4iiJe2PfLvi-86lsx7Y'
    })

    const [map, setMap] = useState(null);
    
    const center = {
      lat: 37.8270, 
      lng: -122.4230
    };

    const onLoad = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = useCallback(map => {
        setMap(null);
    }, []);

    

    return (
        <>
            <h1>Home</h1>
            {
                isLoaded ?
                    <GoogleMap onUnmount={onUnmount} zoom={12} center={center} mapContainerStyle={{ width: 400, height: 400 }} /> :
                    <p>Loading map...</p>

            }

        </>
    );
}

export default Home;