import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Alert,
  IconButton,
  Modal,
} from "@mui/material";
import { API_BASE_URL } from "../environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OrchidDetail = () => {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState(null);
  const [editFeedbackIndex, setEditFeedbackIndex] = useState(null);
  const [error, setError] = useState("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const fetchOrchidDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setOrchid(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orchid details:", error);
      setLoading(false);
    }
  };
  const handleOpenVideoModal = () => {
    setVideoModalOpen(true);
  };
  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
  };
  useEffect(() => {
    fetchOrchidDetails();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [id]);

  const handleAddOrEditFeedback = async () => {
    if (!user) {
      alert("You must be logged in to add feedback.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const newFeedback = {
      rating,
      comment,
      author: user.email,
      date: new Date().toISOString(),
    };

    try {
      let updatedFeedbacks;
      if (editFeedbackIndex !== null) {
        // Editing existing feedback
        updatedFeedbacks = orchid.feedback.map((fb, index) =>
          index === editFeedbackIndex ? newFeedback : fb
        );
        setEditFeedbackIndex(null);
      } else {
        // Adding new feedback
        updatedFeedbacks = orchid.feedback
          ? [...orchid.feedback, newFeedback]
          : [newFeedback];
      }

      const updatedOrchid = { ...orchid, feedback: updatedFeedbacks };
      await axios.put(`${API_BASE_URL}/${id}`, updatedOrchid);
      setOrchid(updatedOrchid);
      setComment("");
      setRating(5);
      setError("");
    } catch (error) {
      console.error("Error adding/editing feedback:", error);
    }
  };

  const handleDeleteFeedback = async (index) => {
    const updatedFeedbacks = orchid.feedback.filter((_, i) => i !== index);
    const updatedOrchid = { ...orchid, feedback: updatedFeedbacks };
    try {
      await axios.put(`${API_BASE_URL}/${id}`, updatedOrchid);
      setOrchid(updatedOrchid);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleEditButtonClick = (feedback, index) => {
    setComment(feedback.comment);
    setRating(feedback.rating);
    setEditFeedbackIndex(index);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!orchid) {
    return (
      <Typography variant="h5" align="center">
        Orchid not found
      </Typography>
    );
  }

  return (
    <Box padding={4} display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 800, boxShadow: "0 6px 12px rgba(0,0,0,0.2)" }}>
        <CardMedia
          component="img"
          height="400"
          image={orchid.image}
          alt={orchid.name}
        />
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4" gutterBottom>
              {orchid.name}
            </Typography>
            {orchid.isSpecial && (
              <Chip
                label="Special Orchid"
                color="secondary"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              />
            )}
          </Box>
          <Typography variant="body1" color="text.secondary" paragraph>
            {orchid.detail}
          </Typography>
          <Box marginY={2}>
            <Typography variant="body1">
              <strong>Category:</strong> {orchid.category}
            </Typography>
            <Typography variant="body1">
              <strong>Origin:</strong> {orchid.origin}
            </Typography>
            <Typography variant="body1">
              <strong>Color:</strong> {orchid.color}
            </Typography>
            <Typography variant="body1">
              <strong>Rating:</strong> {orchid.rating} ⭐
            </Typography>
          </Box>
          {orchid.video && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenVideoModal} // Mở modal video
              sx={{ mt: 2 }}
            >
              Watch Video
            </Button>
          )}

          {/* Modal Video */}
          <Modal open={videoModalOpen} onClose={handleCloseVideoModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxHeight: "80%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {orchid.name}
              </Typography>
              <video controls width="100%" style={{ maxHeight: "70vh" }}>
                <source src={orchid.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Modal>
          {/* Feedback Section */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom>
            Feedback
          </Typography>
          {orchid.feedback && orchid.feedback.length > 0 ? (
            <List>
              {orchid.feedback.map((feedback, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1" component="span">
                          <strong>{feedback.author}</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(feedback.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          Rating: {feedback.rating} ⭐
                        </Typography>
                        <Typography variant="body1" component="p">
                          {feedback.comment}
                        </Typography>
                      </>
                    }
                  />
                  {user && user.email === feedback.author && (
                    <Box>
                      <IconButton
                        onClick={() => handleEditButtonClick(feedback, index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteFeedback(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No feedback available for this orchid.
            </Typography>
          )}

          {/* Add/Edit Feedback Section */}
          {user && (
            <Paper elevation={1} sx={{ padding: 2, mt: 3 }}>
              <Typography variant="h6">
                {editFeedbackIndex !== null ? "Edit Feedback" : "Add Feedback"}
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                label="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                inputProps={{ min: 1, max: 5 }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddOrEditFeedback}
              >
                {editFeedbackIndex !== null
                  ? "Update Feedback"
                  : "Submit Feedback"}
              </Button>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrchidDetail;
