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
  Alert,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../environment";

const UpdateOrchidModal = ({
  open,
  onClose,
  orchidToUpdate,
  onOrchidUpdated,
}) => {
  const [orchid, setOrchid] = useState({
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
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Lấy danh sách category từ API khi modal mở ra
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

  // Thiết lập dữ liệu orchid để cập nhật
  useEffect(() => {
    if (orchidToUpdate) {
      setOrchid(orchidToUpdate);
    }
  }, [orchidToUpdate]);

  // Xử lý thay đổi trường nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrchid({ ...orchid, [name]: value });
  };

  // Xử lý thay đổi cho trường Switch
  const handleSwitchChange = (e) => {
    setOrchid({ ...orchid, isSpecial: e.target.checked });
  };

  // Xử lý thay đổi trường Category
  const handleCategoryChange = (e) => {
    setOrchid({ ...orchid, category: e.target.value });
  };

  // Xác thực các trường
  const validate = () => {
    const newErrors = {};

    if (!orchid.name.trim()) newErrors.name = "Name is required";
    if (!orchid.category) newErrors.category = "Category is required";
    if (!orchid.origin.trim()) newErrors.origin = "Origin is required";
    if (!orchid.color.trim()) newErrors.color = "Color is required";

    if (orchid.rating < 1 || orchid.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }

    // Xác thực URL cho Image
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    if (!orchid.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!urlPattern.test(orchid.image)) {
      newErrors.image = "Invalid image URL";
    }

    // Xác thực URL cho Video
    if (!orchid.video.trim()) {
      newErrors.video = "Video URL is required";
    } else if (!urlPattern.test(orchid.video)) {
      newErrors.video = "Invalid video URL";
    }

    // Xác thực Description (Detail)
    if (!orchid.detail.trim()) {
      newErrors.detail = "Description is required";
    } else if (orchid.detail.length > 200) {
      newErrors.detail = "Description cannot exceed 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý cập nhật orchid
  const handleUpdateOrchid = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to update this orchid?"
    );
    if (!isConfirmed) return;
    if (!validate()) return;

    try {
      await axios.put(`${API_BASE_URL}/${orchid.id}`, orchid);
      setUpdateSuccess(true); // Hiển thị thông báo thành công
      onOrchidUpdated(orchid);
      onClose();
    } catch (error) {
      console.error("Error updating orchid:", error);
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
          Update Orchid
        </Typography>
        {updateSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Orchid updated successfully!
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={orchid.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={orchid.category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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
              value={orchid.origin}
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
              value={orchid.color}
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
              value={orchid.rating}
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
                  checked={orchid.isSpecial}
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
              value={orchid.image}
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
              value={orchid.video}
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
              value={orchid.detail}
              onChange={handleInputChange}
              error={!!errors.detail}
              helperText={errors.detail || "Max 200 characters"}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateOrchid}
            >
              Update Orchid
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

export default UpdateOrchidModal;
