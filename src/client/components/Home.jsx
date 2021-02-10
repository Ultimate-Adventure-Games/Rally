import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import HuntListItem from './HuntListItem';

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
            <Link to={'/hunt/1'}>Test</Link>
            
            <HuntListItem title="Test Title" description="this is my description"/>
        </>
    );
}

export default Home;