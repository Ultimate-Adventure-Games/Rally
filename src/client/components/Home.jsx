import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './ContextProvider';
import HuntListItem from './HuntListItem';

const Home = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // TODO replace API key with environment variable
        googleMapsApiKey: 'AIzaSyCstqCZJ4mDXQsOd1MS9-cVCxUG2YSTJHE'
    })

    const [map, setMap] = useState(null);

    const {
      userLat,
      userLng
    } = useContext(AppContext);
    
    const center = {
      userLat: 37.8270, 
      userLng: -122.4230
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
            <Link to={'/hunt/1'}>Test</Link>
            
            <HuntListItem title="Test Title" description="this is my description"/>
        </>
    );
}

export default Home;