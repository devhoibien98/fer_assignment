import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const ContactPage = () => {
  return (
    <Container className="mt-4">
      <h2>Contact Information</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-6 pb-4">
            <Card.Body>
              <Card.Img
                src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
                alt="FPT University"
                style={{
                  height: "130px",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  maxWidth: "330px",
                  margin: "0 auto",
                }}
              />
              <Card.Text
                style={{
                  paddingTop: "20px",
                }}
              >
                If you have any questions or comments, please feel free to reach
                out!
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> fptuniversity@fpt.vn
                <br />
                <strong>Phone:</strong> (123) 456-7890
                <br />
                <strong>Address:</strong> District 9, HCM City, Vietnam
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Contact Form</Card.Title>
              <Form>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />

                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />

                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Your message"
                />

                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
