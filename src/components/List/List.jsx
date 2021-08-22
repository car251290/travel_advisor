import React,{useState,useEffect,createRef} from 'react';
import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from '@material-ui/core';
import useStyles from './styles';
import { Rating } from '@material-ui/lab/Rating';
import PlaceDetails from '../PlaceDetails/PlaceDetails'
     const List = ({places,childClicked,isLoading}) => {
    const classes = useStyles();
    const [type, setType] = useState('restaurants')
    const [rating,setRating] = useState('');
    const [elRefs, setElRefs] = useState([]);

    useEffect (()=>{
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
        //const refs = Array(places?.length).fill.map((_,i)=> refs[i]|| createRef());
        //setElRefs(elRefs);
    },[places]);
    // to console the objects of the childClicked
    console.log({childClicked})
    return (
    
    <div className={classes.container}>
        <Typography variant = "h4"> Restaurants, Hotels and attractions around you</Typography>
        {isLoading?(
            <div className={classes.loading}>
                <CircularProgress size="5rem"/>
            </div>
        ):(
            <>

       
        <FormControl className = {classes.formControl}>
            <InputLabel>Type</InputLabel>
           
            <Select value = {type} onChange = {(e) => setType(e.target.value) }>
                <MenuItem value="restaurant">Restaurant</MenuItem>
                <MenuItem value="Hotels">Hotels</MenuItem>
                <MenuItem value="restaurant">Attactions</MenuItem>

            </Select>
        </FormControl>

        <FormControl className = {classes.formControl}>
            <InputLabel>Ranking</InputLabel>
            
            <Select value = {rating} onChange = {(e) => setRating(e.target.value) }>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4</MenuItem>
                <MenuItem value={5}>Above 5</MenuItem>

            </Select>
        </FormControl>
        <Grid container spacing = {3} className = {classes.list}>
            {places?.map((place,i) => (
            <Grid item key = {i} xs = {12}>
                <PlaceDetails 
                place={place}
                selected={Number(childClicked===i)}
                refProp={elRefs[i]}/>
                </Grid>
             ))}
       </Grid>
        </>
       )}
      </div>
    );
}

export default List;