import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';

const Favorites = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Favorites
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
          <h2 align="center" style={{ color: 'grey' }}>Your Favorites</h2>
            {/* Add your favorite items here */}
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
