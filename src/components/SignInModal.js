import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

const SignInModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Add your sign-in logic here
    // You may want to call an authentication API or perform other sign-in actions
    console.log('Signing in with:', email, password);

    // Close the modal after sign-in (you can modify this logic based on your needs)
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignIn} color="primary" variant="contained">
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInModal;
