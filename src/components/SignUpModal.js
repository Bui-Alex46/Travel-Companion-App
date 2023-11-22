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
    // Validate input fields if needed
    // You can add additional validation logic here

    try {
      // Change api-url to actual Flask API url

      // In your Flask application, you might need to add the flask-cors extension and use it to enable CORS. Install it using:
      // pip install flask-cors
      // in Flask app import:
      // from flask_cors import CORS
   
      const response = await axios.post('http://your-api-url/signup', {
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email,
        password,
      });

      // Handle the response, e.g., show success message
      console.log(response.data.message);
    } catch (error) {
      // Handle error, e.g., show error message
      console.error(error.response.data.error);
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
