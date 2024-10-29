import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#808080",
        color: "#ffffff",
        padding: "40px 0",
        marginTop: "50px",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
            <h5 style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Orchid Website
            </h5>
            <p style={{ margin: 0, fontSize: "14px" }}>
              © 2024 Orchid Website. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <a
              href="/"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                marginRight: "15px",
                fontSize: "14px",
                transition: "color 0.3s",
              }}
              className="footer-link"
            >
              Home
            </a>
            <a
              href="/about"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                marginRight: "15px",
                fontSize: "14px",
                transition: "color 0.3s",
              }}
              className="footer-link"
            >
              About
            </a>
            <a
              href="/contact"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.3s",
              }}
              className="footer-link"
            >
              Contact
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
