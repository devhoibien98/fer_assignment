import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { API_BASE_URL } from '../environment';
import UpdateOrchidModal from '../components/updateOrchidModal';
import AddOrchidModal from '../components/addOrchidModal';

const OrchidManagementPage = () => {
  const [orchids, setOrchids] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchOrchids = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setOrchids(response.data);
    } catch (error) {
      console.error('Error fetching orchids:', error);
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  const handleDeleteClick = (orchid) => {
    setSelectedOrchid(orchid);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedOrchid(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedOrchid) {
      try {
        console.log(`Deleting orchid with URL: ${API_BASE_URL}/${selectedOrchid.id}`);
        await axios.delete(`${API_BASE_URL}/${selectedOrchid.id}`);
        setOrchids(orchids.filter(o => o.id !== selectedOrchid.id));
        setOpenConfirmDialog(false);
        setSelectedOrchid(null);
        setOpenSnackbar(true); // Show success notification
      } catch (error) {
        if (error.response) {
          console.error(`Error ${error.response.status}: ${error.response.data}`);
        } else {
          console.error('Network error:', error.message);
        }
      }
    }
  };

  const handleUpdateClick = (orchid) => {
    setSelectedOrchid(orchid);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedOrchid(null);
  };

  const handleOrchidUpdated = (updatedOrchid) => {
    const updatedList = orchids.map((orchid) =>
      orchid.id === updatedOrchid.id ? updatedOrchid : orchid
    );
    setOrchids(updatedList);
    setOpenSnackbar(true); // Show success notification
  };

  const handleAddOrchidClick = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOrchidAdded = (newOrchid) => {
    setOrchids([...orchids, newOrchid]);
    setOpenSnackbar(true); // Show success notification
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom align="center">
        Orchid Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddOrchidClick} sx={{ mb: 3 }}>
        Add Orchid
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orchids.map((orchid) => (
              <TableRow key={orchid.id}>
                <TableCell>{orchid.name}</TableCell>
                <TableCell>{orchid.rating}</TableCell>
                <TableCell><img style={{ width: '100px', height: '100px' }} src={orchid.image} alt={orchid.name} /></TableCell>
                <TableCell>{orchid.color}</TableCell>
                <TableCell>{orchid.origin}</TableCell>
                <TableCell>{orchid.category}</TableCell>
                <TableCell sx={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{orchid.detail}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleUpdateClick(orchid)}>
                    Update
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(orchid)} sx={{ ml: 1 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this orchid?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Orchid Modal */}
      <UpdateOrchidModal open={openUpdate} onClose={handleCloseUpdate} orchidToUpdate={selectedOrchid} onOrchidUpdated={handleOrchidUpdated} />

      {/* Add Orchid Modal */}
      <AddOrchidModal open={openAdd} onClose={handleCloseAdd} onOrchidAdded={handleOrchidAdded} />

      {/* Snackbar for Success Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Operation successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrchidManagementPage;
