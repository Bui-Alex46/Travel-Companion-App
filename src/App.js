import React, {useEffect, useState, useContext, createContext} from 'react';
import {CssBaseline, Grid, Button } from '@material-ui/core';
import {getPlacesData} from './api';
// Headers
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
// import Favorites from './components/Favorites';
function App() {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [type, setType] = useState('restaurants'); 
  const [rating, setRating] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    })
  }, []);


  useEffect(() => {
    const filteredPlaces = (places ?? []).filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);
  

  useEffect(() => {
    setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setFilteredPlaces([])
        setIsLoading(false);
      })
    
  }, [type, bounds]);

 
  
  return (
    <>
      <CssBaseline />
      <Header setCoordinates = {setCoordinates}/>
      {/* <Grid item xs = {5} md = {2}>
          <Favorites open={isFavoritesModalOpen} onClose={closeFavoritesModal} places = {places} />
        </Grid> */}
      <Grid container spacing={3} style={{ width: '100%' }}>
      
        <Grid item xs = {12} md = {4}>
          <List 
          places = {filteredPlaces.length ? filteredPlaces : places} 
          childClicked = {childClicked}
          isLoading = {isLoading}
          type = {type}
          setType = {setType}
          rating = {rating}
          setRating = {setRating}
          />
        </Grid>
        
        <Grid item xs = {12} md = {8}>
          <Map 
            setCoordinates = {setCoordinates}
            setBounds = {setBounds}
            coordinates = {coordinates}
            places = {filteredPlaces.length ? filteredPlaces : places}
            setChildClicked = {setChildClicked}
          />
        </Grid>
      </Grid>

      
    </>
  );
}

export default App;
