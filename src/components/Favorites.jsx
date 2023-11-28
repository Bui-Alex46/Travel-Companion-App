import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';

const Favorites = ({open, onClose, places}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
 
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your actual storage key
        console.log(token);
        const response = await fetch('http://127.0.0.1:5000/favorite', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error('Failed to fetch favorites');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    // Fetch favorites when the modal is opened
    if (modalOpen) {
      fetchFavorites();
    }
  }, [modalOpen]);
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
    <Button variant="contained" color="primary" onClick={handleOpen}>
      Open Favorites
    </Button>
    <Modal
      open={modalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <div>
          <h2 align="center" style={{ color: 'grey' }}>Your Favorites</h2>
          {/* Render your favorite items using the state */}
          {favorites.map((favorite, index) => (
            <div key={index}>
              {/* Render each favorite item as needed */}
              <p>{favorite.name}</p>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Fade>
    </Modal>
  </div>
);
};

export default Favorites;
