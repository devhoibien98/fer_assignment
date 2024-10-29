import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Switch,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../environment";

const AddOrchidModal = ({ open, onClose, onOrchidAdded }) => {
  const [newOrchid, setNewOrchid] = useState({
    name: "",
    category: "",
    origin: "",
    rating: 0,
    isSpecial: false,
    image: "",
    color: "",
    detail: "",
    video: "",
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://670f94ee3e71518616588d3a.mockapi.io/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrchid({ ...newOrchid, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setNewOrchid({ ...newOrchid, isSpecial: e.target.checked });
  };

  const handleCategoryChange = (e) => {
    setNewOrchid({ ...newOrchid, category: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!newOrchid.name.trim()) newErrors.name = "Name is required";
    if (!newOrchid.category) newErrors.category = "Category is required";
    if (!newOrchid.origin.trim()) newErrors.origin = "Origin is required";
    if (!newOrchid.color.trim()) newErrors.color = "Color is required";

    if (newOrchid.rating < 1 || newOrchid.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
    // Xác thực URL cho Image
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    if (!newOrchid.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!urlPattern.test(newOrchid.image)) {
      newErrors.image = "Invalid image URL";
    }

    // Xác thực URL cho Video
    if (!newOrchid.video.trim()) {
      newErrors.video = "Video URL is required";
    } else if (!urlPattern.test(newOrchid.video)) {
      newErrors.video = "Invalid video URL";
    }

    // Xác thực Description (Detail)
    if (!newOrchid.detail.trim()) {
      newErrors.detail = "Description is required";
    } else if (newOrchid.detail.length > 200) {
      newErrors.detail = "Description cannot exceed 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrchid = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(API_BASE_URL, newOrchid);
      onOrchidAdded(response.data);
      onClose();
      setNewOrchid({
        name: "",
        category: "",
        origin: "",
        rating: 0,
        isSpecial: false,
        image: "",
        color: "",
        detail: "",
        video: "",
      });
    } catch (error) {
      console.error("Error adding orchid:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,

          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Add New Orchid
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={newOrchid.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newOrchid.category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography color="error">{errors.category}</Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Origin"
              name="origin"
              fullWidth
              variant="outlined"
              value={newOrchid.origin}
              onChange={handleInputChange}
              error={!!errors.origin}
              helperText={errors.origin}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Color"
              name="color"
              fullWidth
              variant="outlined"
              value={newOrchid.color}
              onChange={handleInputChange}
              error={!!errors.color}
              helperText={errors.color}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              fullWidth
              variant="outlined"
              value={newOrchid.rating}
              onChange={handleInputChange}
              error={!!errors.rating}
              helperText={errors.rating || "Enter a rating between 1 and 5"}
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={newOrchid.isSpecial}
                  onChange={handleSwitchChange}
                />
              }
              label="Special Orchid"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              name="image"
              fullWidth
              variant="outlined"
              value={newOrchid.image}
              onChange={handleInputChange}
              error={!!errors.image}
              helperText={errors.image}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Video URL"
              name="video"
              fullWidth
              variant="outlined"
              value={newOrchid.video}
              onChange={handleInputChange}
              error={!!errors.video}
              helperText={errors.video}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="detail"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={newOrchid.detail}
              onChange={handleInputChange}
              error={!!errors.detail}
              helperText={errors.detail || "Max 200 characters"}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrchid}
            >
              Add Orchid
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddOrchidModal;
