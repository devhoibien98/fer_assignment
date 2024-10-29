import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const CATEGORIES_API = "https://670f94ee3e71518616588d3a.mockapi.io/categories";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: '', name: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_API);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpen = (category = { id: '', name: '' }) => {
    setCurrentCategory(category);
    setIsEdit(!!category.id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await axios.put(`${CATEGORIES_API}/${currentCategory.id}`, currentCategory);
      } else {
        await axios.post(CATEGORIES_API, currentCategory);
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${CATEGORIES_API}/${deleteId}`);
      fetchCategories();
      setConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => setConfirmOpen(false);

  const isFormValid = currentCategory.name.trim() !== '';

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Category Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()}>Add Category</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(category)}>Edit</Button>
                <Button color="error" onClick={() => handleDeleteConfirm(category.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            name="name"
            fullWidth
            value={currentCategory.name}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!isFormValid} variant="contained" color="primary">
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default CategoryManagement;
