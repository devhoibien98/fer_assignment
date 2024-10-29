import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography, Card, CardContent, CardMedia, Grid, Chip, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListOrchid = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrchids, setFilteredOrchids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const fetchOrchids = async () => {
    try {
      const response = await axios.get('https://670f94ee3e71518616588d3a.mockapi.io/orchids');
      setOrchids(response.data);
      setFilteredOrchids(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orchids:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://670f94ee3e71518616588d3a.mockapi.io/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterByCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    const filtered = categoryName
      ? orchids.filter((orchid) => orchid.category === categoryName)
      : orchids;
    setFilteredOrchids(filtered);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchName(searchValue);
    const filtered = orchids.filter((orchid) =>
      orchid.name.toLowerCase().includes(searchValue) &&
      (!selectedCategory || orchid.category === selectedCategory)
    );
    setFilteredOrchids(filtered);
  };

  useEffect(() => {
    fetchOrchids();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" padding={4}>
      {/* Left Sidebar for Category Filters */}
      <Box width="200px" marginRight={4}>
        <Typography variant="h6" gutterBottom>Categories</Typography>
        <Box
          onClick={() => filterByCategory('')}
          sx={{ cursor: 'pointer', marginBottom: 1, color: !selectedCategory ? 'primary.main' : 'inherit' }}
        >
          All
        </Box>
        {categories.map((category) => (
          <Box
            key={category.id}
            onClick={() => filterByCategory(category.name)}
            sx={{
              cursor: 'pointer',
              marginBottom: 1,
              color: selectedCategory === category.name ? 'primary.main' : 'inherit',
              '&:hover': { fontWeight: 'bold' },
            }}
          >
            {category.name}
          </Box>
        ))}
      </Box>

      {/* Main Content */}
      <Box flex={1} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom align="center">
          List of Orchids
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchName}
          onChange={handleSearch}
          sx={{ marginBottom: 4, width: '50%' }}
        />

        <Grid container spacing={3} justifyContent="center">
          {filteredOrchids.map((orchid) => (
            <Grid item xs={12} sm={6} md={4} key={orchid.id}>
              <Card
                onClick={() => navigate(`/orchids/${orchid.id}`)}
                sx={{
                  maxWidth: 345,
                  margin: 'auto',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={orchid.image}
                  alt={orchid.name}
                />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" noWrap>
                      {orchid.name}
                    </Typography>
                    {orchid.isSpecial && (
                      <Chip 
                        label="Special Orchid" 
                        color="secondary" 
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {orchid.origin}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListOrchid;
