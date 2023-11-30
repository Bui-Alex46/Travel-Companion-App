import React, { useState , useEffect, createRef} from 'react';
import  {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl ,Select } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { ContactSupportOutlined, Refresh } from '@material-ui/icons';
const List = ({places, childClicked, isLoading}) => {

    const classes = useStyles();
    const [type, setType] = useState('restaurants'); 
    const [rating, setRating] = useState('');
    const [elRefs, setElRefs] = useState([]);
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        
        setElRefs(refs);
    }, [places]);
    return(
        <div className={classes.container}>
            {/* List Search */}
            <Typography variant = "h4"> Resraurants, Hotels, & Attractions around you </Typography>
            {isLoading ? (
                <div className = {classes.loading}>
                    <CircularProgress size = "5rem"/>
                </div>
            ) : (
                <>
            {/* Type Section */}
            <FormControl className = {classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value = {type} onChange = {(e) => setType(e.target.value)}>
                    <MenuItem value = "restaurants">Restaurants</MenuItem>
                    <MenuItem value = "hotels">Hotels</MenuItem> 
                    <MenuItem value = "attractions">Sttractions</MenuItem>  
                    </Select>
            </FormControl>
            {/* Rating Section */}
            <FormControl className = {classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value = {rating} onChange = {(e) => setRating(e.target.value)}>
                    <MenuItem value = {0}>All</MenuItem>
                    <MenuItem value = {3}>Above 3.0</MenuItem> 
                    <MenuItem value = {4}>Above 4.0</MenuItem>
                    <MenuItem value = {5}>Above 4.5</MenuItem>    
                    </Select>
            </FormControl>
            <Grid container spacing = {3} className = {classes.list}>
                {places?.map((place, i) => (
                    <Grid item key = {i} xs = {12}>
                        <PlaceDetails place = 
                        {place} 
                        selected={Number(childClicked)===i}
                        refProp = {elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List