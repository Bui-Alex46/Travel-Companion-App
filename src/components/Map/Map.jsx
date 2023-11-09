import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';


// Importing classes
import useStyles from './styles';
const Map = () => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = {lat: 0, lng: 0};
    return(
        // Properties for the google map
        <div className = {classes.mapContainer}>
            <GoogleMapReact 
            bootstrapURLKeys={{key:'AIzaSyBl4k598rySf2r7Hd417D9dDFcA8o_AwqI'}} 
            defaultCenter={coordinates}
            center = {coordinates}
            defaultZoom = {14}
            margin={[50, 50, 50, 50]}
            options = {''}
            onChange = {''}
            onChildClick = {''}
            >
                

            </GoogleMapReact>
        </div>
    );
}

export default Map