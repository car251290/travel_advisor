import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {CssBaseline, Grid} from '@material-ui/core';
import {getPlacesData} from './api'


const App = () => {
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    //to set and get the place where you are 
    const [places, setPlaces] = useState([]);

    const [childClicked, setChildClicked] = useState(null);
    const [isLoading,setisLoading] = useState(false);
  
    useEffect (()=> {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude} } ) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    },[])

    //using the effect to unwrapp the data of the restaurants
    useEffect ( () => {
        setisLoading(true);
        //console.log(coordinates, bounds)
        getPlacesData(bounds.sw,bounds.ne)
        .then((data) => {
            //consolelog the data 
            //console.log(data);
            //the set data to the places
            setPlaces(data)
            setisLoading(false);

        })

    },[coordinates, bounds])

    return (
        <>
        <CssBaseline/>
        <Header/>
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List places = {places}
                childClicked={childClicked}
                />
            </Grid>

            <Grid item xs={12} md={8}>
                <Map 
                setCoordinates = {setCoordinates}
                setBounds = {setBounds}
                coordinates = {coordinates}
                isLoading={isLoading}
                places={places}
                />
            </Grid>
            
        </Grid>
        </>
    )
}
export default App;