import React from 'react';
import MapGL from 'react-map-gl';
import {Marker} from 'react-map-gl'

const MapUser = () =>{

    const [viewport, setViewport] = React.useState({
            width:"100%",
            height:"100vh",
            zoom: 16,
            pitch: 0,
                latitude:0,
                longitude:0
        }
    )
    const [locationUser, setLocation] = React.useState({latitude:0, longitude:0})

    const setUserLocation = () =>{
        if (navigator.geolocation){
            navigator.geolocation.watchPosition((pos)=>{
                viewport.latitude = pos.coords.latitude;
                viewport.longitude = pos.coords.longitude;
                setViewport(viewport)
                setLocation({latitude:viewport.latitude, longitude:viewport.longitude})
            },)
        }
    }

    React.useEffect(()=>{
        setUserLocation()
    },[])


    return(
        <>
            <MapGL {...viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={(viewport)=>setViewport(viewport)}>
                    <Marker latitude={parseFloat(locationUser.latitude)} longitude={parseFloat(locationUser.longitude)}>
                        <img src="https://www.freepngimg.com/thumb/map/63086-map-google-computer-icons-point-vector-maker.png" 
                        width="30"/>
                    </Marker>
            </MapGL>
        </>
    )
}

export default MapUser;