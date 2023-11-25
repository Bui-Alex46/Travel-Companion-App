import React ,{ useState } from 'react';
import {Autocomplete} from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, InputBase, Box, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SignInModal from '../SignInModal'
import SignUpModal from '../SignUpModal'
import useStyles from './styles';
import Favorites from '../Favorites';
const Heaeder = () => {
    const classes = useStyles();
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
   
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
                <SignInModal open={isSignUpModalOpen} onClose={closeSignInModal} />
                
                <Button variant="contained" color="primary" onClick={openSignUpModal}>
                     Sign Up
                </Button>
                <SignUpModal open={isSignUpModalOpen} onClose={closeSignUpModal} />
                
                
                <Favorites open={isFavoritesModalOpen} onClose={closeFavoritesModal} />
                
                
                <Box display = "flex">
                    <Typography variant = "h6" className = {classes.title}>
                        Explore New places
                    </Typography>
                   
                    {/* <Autocomplete> */}
                        <div className = {classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder = "Search..." classes = {{root: classes.inputRoot, input: classes.inputInput}}/>
                        </div>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Heaeder