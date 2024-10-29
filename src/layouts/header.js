import React, { useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleUserClick = () => {
    if (user?.role === "user") {
      navigate("/profile");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Listen for storage changes to log out on all tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user" && event.newValue === null) {
        // If 'user' is removed from localStorage, redirect to login
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <AppBar position="static" sx={{ bgcolor: "grey", paddingY: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography
            component={Link}
            to="/"
            variant="h5"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              mr: 3,
              "&:hover": { color: "lightgrey" },
            }}
          >
            Orchid Management
          </Typography>
          {isAuthenticated && isAdmin && (
            <Box display="flex" gap={2}>
              <Button
                component={Link}
                to="/orchid-management"
                sx={{
                  color: "white",
                  textTransform: "capitalize",
                  fontWeight: "medium",
                  "&:hover": {
                    color: "lightgrey",
                    bgcolor: "primary.light",
                    borderRadius: 1,
                  },
                }}
              >
                Manage Orchids
              </Button>
              <Button
                component={Link}
                to="/category-management"
                sx={{
                  color: "white",
                  textTransform: "capitalize",
                  fontWeight: "medium",
                  "&:hover": {
                    color: "lightgrey",
                    bgcolor: "primary.light",
                    borderRadius: 1,
                  },
                }}
              >
                Manage Categories
              </Button>
            </Box>
          )}
          <Button
            component={Link}
            to="/contact"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: "medium",
              "&:hover": {
                color: "lightgrey",
                bgcolor: "primary.light",
                borderRadius: 1,
              },
            }}
          >
            Contact
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: "white",
              textTransform: "capitalize",
              fontWeight: "medium",
              "&:hover": {
                color: "lightgrey",
                bgcolor: "primary.light",
                borderRadius: 1,
              },
            }}
          >
            About
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          {isAuthenticated && (
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize",
                mr: 2,
                cursor: "pointer",
              }}
              onClick={handleUserClick}
            >
              Welcome, {user.role === "user" ? user.displayName : user.role}
            </Typography>
          )}
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={handleLogoutClick}
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize",
                "&:hover": {
                  color: "lightgrey",
                  bgcolor: "primary.light",
                  borderRadius: 1,
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLoginClick}
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize",
                "&:hover": {
                  color: "lightgrey",
                  bgcolor: "primary.light",
                  borderRadius: 1,
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
