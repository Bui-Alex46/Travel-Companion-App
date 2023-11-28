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
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  // const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  // const openFavoritesModal = () => {
  //   setIsFavoritesModalOpen(true);
  // };

  // const closeFavoritesModal = () => {
  //   setIsFavoritesModalOpen(false);
  // };
 
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    })
  }, []);


  useEffect(() => {
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        setPlaces(data);
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
          <List places = {places} />
        </Grid>
        
        <Grid item xs = {12} md = {8}>
          <Map 
            setCoordinates = {setCoordinates}
            setBounds = {setBounds}
            coordinates = {coordinates}
            places = {places}
          />
        </Grid>
      </Grid>

      
    </>
  );
}

export default App;
