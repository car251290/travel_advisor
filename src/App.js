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
    const [type, setType] = useState('restaurants')
    const [rating,setRating] = useState('');
    const [filterplaces, setFilterplacer]= useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const [autocomplete, setAutocomplete] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
  
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        });
      }, []);

    useEffect( () =>{
        const  filterplaces = places.filter((places)=> Number(places.rating) > rating);
        setFilterplacer(filterplaces);

    },[rating]);

    //using the effect to unwrapp the data of the restaurants
    useEffect ( () => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
            //to get the weather data
            getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data));
            //console.log(coordinates, bounds)
            getPlacesData(type,bounds.sw,bounds.ne)
            .then((data) => {
                //consolelog the data 
                //console.log(data);
                //the set data to the places
                setPlaces(data?.filter((place)=>place.name && place.num_review > 0))
                setFilterplacer([]);
                setIsLoading(false);
                setRating('');
    
            })

        }
    },[type, bounds])

    const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

   // console.log(places);
    //console.log(PlaceDetails);
   

    return (
        <>
        <CssBaseline/>
        <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                places = { filterplaces.length ? filterplaces : places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
            </Grid>

            <Grid item xs={12} md={8}>
                <Map 
                setCoordinates = {setCoordinates}
                setBounds = {setBounds}
                coordinates = {coordinates}
                isLoading={isLoading}
                setChildClicked={setChildClicked}
                places={filterplaces.length ? filterplaces : places}
                weatherData={weatherData}
                />
            </Grid>
        </Grid>
        </>
    )
}
export default App;
