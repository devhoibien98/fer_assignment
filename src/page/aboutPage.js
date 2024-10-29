import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f7f7f7" }} // Màu nền nhẹ
    >
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={12} md={10} lg={8}>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "36px",
              marginBottom: "20px",
              color: "#4CAF50", // Màu chủ đạo xanh lá cây
            }}
          >
            About Orchid Company
          </h2>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "30px",
              color: "#333",
              lineHeight: "1.6",
            }}
          >
            Welcome to Orchid Company, your premier destination for exquisite
            orchids. We are passionate about cultivating and sharing the beauty
            of orchids, providing our customers with exceptional service and
            unique varieties that inspire.
          </p>

          {/* Thẻ "Our Journey" */}
          <Card className="about-card my-4">
            <Card.Body>
              <Card.Title className="about-card-title">Our Journey</Card.Title>
              <Card.Text className="about-card-text">
                Founded in 2020 by a team of orchid enthusiasts, Orchid Company
                began as a small venture aimed at bringing the joy of orchids to
                homes everywhere. Our founders' dedication and love for these
                remarkable plants fueled our growth into a beloved brand.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Thẻ "Our Vision" */}
          <Card className="about-card my-4">
            <Card.Body>
              <Card.Title className="about-card-title">Our Vision</Card.Title>
              <Card.Text className="about-card-text">
                We strive to be the leading provider of high-quality orchids,
                fostering a deeper appreciation for these stunning plants. Our
                vision is to create a community where orchid lovers can connect,
                learn, and share their passion.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Thẻ "Get in Touch" */}
          <Card className="about-card my-4">
            <Card.Body>
              <Card.Title className="about-card-title">Get in Touch</Card.Title>
              <Card.Text className="about-card-text">
                We would love to hear from you! If you have any questions or
                suggestions, feel free to reach out to us. Your feedback is
                invaluable in helping us improve our services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
