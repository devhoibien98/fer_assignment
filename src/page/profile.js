// Profile Component
import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ displayName: '', photoURL: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setFormData({ displayName: userData.displayName, photoURL: userData.photoURL });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Avatar src={formData.photoURL} alt={formData.displayName} sx={{ width: 100, height: 100, mb: 2 }} />

      {editing ? (
        <>
          <TextField
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Photo URL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
          <Button onClick={() => setEditing(false)} sx={{ mt: 1 }}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>{user.displayName}</Typography>
          <Typography variant="body1" color="textSecondary">{user.email}</Typography>
          <Button variant="outlined" color="primary" onClick={handleEdit} sx={{ mt: 4 }}>
            Edit Profile
          </Button>
        </>
      )}

      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
