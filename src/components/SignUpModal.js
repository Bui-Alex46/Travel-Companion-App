import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import axios from 'axios';
const SignUpModal = ({ open, onClose, onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
   
    var formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('user_name', userName);
    formData.append('email', email);
    formData.append('passw', password);
    
   
  
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   // Add any additional headers if needed, e.g., authorization token
        // },
        body: formData
      });
      console.log(firstName)
      console.log(lastName)
      console.log(userName)
      console.log(email)
      console.log(password)
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('An error occurred:', error.message);
    }
  
    // Close the modal after sign-up (you can modify this logic based on your needs)
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <Button onClick={handleSignUp} color="primary" variant="contained">
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpModal;
