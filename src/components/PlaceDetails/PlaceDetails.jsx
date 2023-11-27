import React, {useState} from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
const PlaceDetails = ({place}) => {
    const classes = useStyles();
    const [favorite, setFavorite] = useState(false);
    const addToFavorites = async () => {
        const apiUrl = 'http://127.0.0.1:5000/favorite';
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');
    
        if (!token || !userID) {
            console.error('Session token or user ID not found');
            return;
        }
       
    
        try {
            const formData = new FormData();
            formData.append('name', place.name);
            formData.append('address_id', place.location_id);
            formData.append('user_id', userID);
            console.log(formData.data);
            const response = await fetch(apiUrl,{
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                // Handle success, e.g., show a success message to the user.
                setFavorite(true);
                console.log('Place added to favorites successfully!');
            } else {
                // Handle error, e.g., show an error message to the user.
                console.error('Failed to add place to favorites.');
            }
        } catch (error) {
            console.error('Error while adding place to favorites:', error);
        }
    };
    
    

      
    return(
       <Card elevation = {6}>
        <CardMedia 
        style = {{height: 350}}
        image = {place.photo?place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title = {place.name}
        />
        <CardContent>
            <Typography gutterBottom variant = "h5">{place.name}</Typography>
            <Box display = "flex" justifyContent = "space-between">
                <Typography variant = "subtitle1">Price</Typography>
                <Typography gutterBottom variant = "subtitle1">{place.price_level}</Typography>
            </Box>
            <Box display = "flex" justifyContent = "space-between">
                <Typography variant = "subtitle1">Ranking</Typography>
                <Typography gutterBottom variant = "subtitle1">{place.ranking}</Typography>
            </Box>
            <Box>
                <Button
                    size="small"
                    color="primary"
                    onClick={addToFavorites}
                    disabled={favorite} // Disable the button if it's already a favorite
                    >
                    {favorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
            </Box>
            {place?.award?.map((award) => (
                <Box my = {1} display = "flex" justifyContent = "space-between" alignItems = "center">
                    <img src = {award.images.small} alt = {award.display_name} />
                    <Typography variant = "subtitle2" color = "textSecondary">{award.display_name}</Typography>
                </Box>
            ))}
            {place?.cuisine?.map(({name}) => {
                <Chip key = {name} size = "small" label = {name} className = {classes.chip}/>
            })}
            {place?.address &&(
                <Typography gutterBottom variant = "subtitle2" color = 
                "textSecondary" className = {classes.subtitle}>
                    <LocationOnIcon />{place.address}
                </Typography>
            )}
            {place?.phone &&(
                <Typography gutterBottom variant = "subtitle2" color = 
                "textSecondary" className = {classes.spacing}>
                    <PhoneIcon />{place.phone}
                </Typography>
            )}
        <CardActions>
            <Button size = "small" color = "primary" onClick = {() => window.open(place.web_url, '_blank')}>
                Trip Advisor
            </Button>
            <Button size = "small" color = "primary" onClick = {() => window.open(place.website, '_blank')}>
                Website
            </Button>
        </CardActions>
        
        
        </CardContent>
        
       </Card>
    );
}

export default PlaceDetails