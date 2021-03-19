import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import {
  FaFacebook,
  FaDiscord,
  FaGooglePlus,
  FaInstagram,
} from "react-icons/fa";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <Container
      fluid
      className="mx-0"
      style={{
        marginTop: "8rem",
        backgroundColor: "whitesmoke",
      }}
    >
      <Row className="mx-3">
        <Col className="my-5">
          <h5>Store Information</h5>
          <ul style={{ listStyle: "none", padding: "0", lineHeight: "250%" }}>
            <li>About us</li>
            <li>Contact us</li>
            <li>Buy with Confidence</li>
            <li>Career Opportunities</li>
          </ul>
        </Col>
        <Col className="my-5">
          <h5>Services Support</h5>
          <ul style={{ listStyle: "none", padding: "0", lineHeight: "250%" }}>
            <li>Order Lookup</li>
            <li>View all Manufacturers</li>
            <li>Frequently Asked Questions</li>
          </ul>
        </Col>
        <Col className="my-5">
          <h5>Hot Deals</h5>
          <ul style={{ listStyle: "none", padding: "0", lineHeight: "250%" }}>
            <li>Keyboard Deals</li>
            <li>Guitar Deals</li>
            <li>Drum Deals</li>
            <li>DJ Deals</li>
          </ul>
        </Col>
        <Col className="my-5">
          <h5>Follow us on social media!</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <a href="" style={{ margin: "2px", flex: "1" }}>
              <FaFacebook />
            </a>
            <a href="" style={{ margin: "2px", flex: "1" }}>
              <FaDiscord />
            </a>
            <a href="" style={{ margin: "2px", flex: "1" }}>
              <FaGooglePlus />
            </a>
            <a href="" style={{ margin: "2px", flex: "1" }}>
              <FaInstagram />
            </a>
          </div>
        </Col>
      </Row>
      <Row className="mx-3">
        <Col className="mb-5">
          <h6>
            Copyright <BiCopyright /> 2021 Music Store
          </h6>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
