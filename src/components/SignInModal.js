import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

const SignInModal = ({ open, onClose, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Signing in with:', username, password);
    var formData = new FormData();
    formData.append('user_name', username);
    formData.append('password', password);


  
  try {
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      body: formData,
    });


    if (response.ok) {
      // Sign in successful
      const responseData = await response.json();
      console.log('Sign in successful');
      console.log('Response data:', responseData);
    
      // Extract and set user ID
      const { userID, token } = responseData;
      setUserId(userID);
      console.log('User ID:', userID);

      // Store session token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userID', userID);
      console.log('Session token', token)
    } else {
      // Sign in failed
      const errorData = await response.json();
      console.error('Sign in failed:', errorData.error);
    }
  } catch (error) {
    // Handle network or other unexpected errors
    console.error('An error occurred:', error.message);
  }

    // Close the modal after sign-in (you can modify this logic based on your needs)
    onClose();
  };

  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit = {handleSignIn}> 
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button  type="submit" color="primary" variant="contained">
          Sign In
        </Button>
      </DialogActions>
      </form>
 
    </Dialog>
  );
};

export default SignInModal;
