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
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  

  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    })
  }, []);


  useEffect(() => {
    setIsLoading(true);
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      })
    
  }, [coordinates,bounds]);


  
  return (
    <>
      <CssBaseline />
      <Header />
      {/* <Grid item xs = {5} md = {2}>
          <Favorites open={isFavoritesModalOpen} onClose={closeFavoritesModal} places = {places} />
        </Grid> */}
      <Grid container spacing={3} style={{ width: '100%' }}>
      
        <Grid item xs = {12} md = {4}>
          <List 
          places = {places} 
          childClicked = {childClicked}
          isLoading = {isLoading}
          />
        </Grid>
        
        <Grid item xs = {12} md = {8}>
          <Map 
            setCoordinates = {setCoordinates}
            setBounds = {setBounds}
            coordinates = {coordinates}
            places = {places}
            setChildClicked = {setChildClicked}
          />
        </Grid>
      </Grid>

      
    </>
  );
}

export default App;
