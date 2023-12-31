import React ,{ useState } from 'react';
import {Autocomplete} from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, InputBase, Box, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SignInModal from '../SignInModal'
import SignUpModal from '../SignUpModal'
import useStyles from './styles';
import Favorites from '../Favorites';
const Heaeder = ({setCoordinates}) => {
    const classes = useStyles();
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null)
    
    const onLoad = (autoC) => setAutocomplete(autoC)
   
    const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng =autocomplete.getPlace().geometry.location.lng();
      setCoordinates({lat,lng})
    }
    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
      }
      const closeSignUpModal = () => {
        setIsSignUpModalOpen(false);
      }
    const openSignInModal = () => {
        setIsSignInModalOpen(true);
      }
      const closeSignInModal = () => {
        setIsSignInModalOpen(false);
      }
      const openFavoritesModal = () => {
        setIsFavoritesModalOpen(true);
      };
    
      const closeFavoritesModal = () => {
        setIsFavoritesModalOpen(false);
      };

    return(
        <AppBar position = "static">
            
            <Toolbar className = {classes.toolbar}>
                <Typography variant = "h5" className = {classes.title}>
                    Travel Advisor
                    
                </Typography>
                <Button variant="contained" color="primary" onClick={openSignInModal}>
                     Sign In
                </Button>
                <SignInModal open={isSignInModalOpen} onClose={closeSignInModal} setUserId={setUserId} />
                <Button>
                <Favorites open={isFavoritesModalOpen} onClose={closeFavoritesModal} setUserId = {setUserId} />
                </Button>
                <Button variant="contained" color="primary" onClick={openSignUpModal}>
                     Sign Up
                </Button>
                <SignUpModal open={isSignUpModalOpen} onClose={closeSignUpModal} />
                
                
                
                
                
                <Box display = "flex">
                    <Typography variant = "h6" className = {classes.title}>
                        Explore New places
                    </Typography>
                   
                    <Autocomplete onLoad = {onLoad} onPlaceChanged = {onPlaceChanged}> 
                        <div className = {classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder = "Search..." classes = {{root: classes.inputRoot, input: classes.inputInput}}/>
                        </div>
                     </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Heaeder