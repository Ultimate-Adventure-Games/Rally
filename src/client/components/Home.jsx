import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';

const Home = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ''
    })

    const [map, setMap] = useState(null);

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
                    <GoogleMap onLoad={onLoad} onUnmount={onUnmount} zoom={10} center={{ lat: -3.745, lng: -38.523 }} mapContainerStyle={{ width: 400, height: 400 }} /> :
                    <p>Loading map...</p>

            }

        </>
    );
}

export default Home;