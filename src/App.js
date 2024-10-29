// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactPage from "./page/contactPage";
import AboutPage from "./page/aboutPage";
import HomePage from "./page/homePage";
import OrchidDetail from "./page/orchidDetailPage";
import LoginPage from "./page/loginPage";
import OrchidManagementPage from "./page/orchidManagementPage";
import PrivateRoute from "./routes/privateRoute";
import Header from "./layouts/header";
import Profile from "./page/profile";
import CategoryManagement from "./page/categoriesManagement";
import UnauthorizedPage from "./routes/unauthorization";
import Footer from "./layouts/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute requiredRole="user">
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/orchids/:id" element={<OrchidDetail />} />

        {/* Admin-only routes */}
        <Route
          path="/orchid-management"
          element={
            <PrivateRoute requiredRole="admin">
              <OrchidManagementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category-management"
          element={
            <PrivateRoute requiredRole="admin">
              <CategoryManagement />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
