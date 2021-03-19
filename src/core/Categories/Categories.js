import React from "react";
import { Card, Col, Container, Row, CardDeck } from "react-bootstrap";
import { withRouter } from "react-router";

const Categories = ({ history }) => {
  const handleClick = () => {
    alert("clicked");
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "3rem" }}>
        <h3>Popular Categories</h3>
      </div>

      <Container>
        <Row className="d-flex justify-content-center">
          <CardDeck>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  width: "15rem",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() => {
                  history.push("/collections/electric-guitars");
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/6580251/pexels-photo-6580251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Electric Guitars</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/acoustic-guitars");
                }}
              >
                <Card.Img src="https://images.unsplash.com/photo-1589471861110-1144cd568519?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Acoustic Guitars</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/keyboards");
                }}
              >
                <Card.Img src="https://images.unsplash.com/photo-1523297554394-dc159677ffe1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Keyboards</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/drums");
                }}
              >
                <Card.Img src="https://images.unsplash.com/photo-1583916589930-3984a53bf8a4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Drums</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </CardDeck>

          <CardDeck>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/microphones");
                }}
              >
                <Card.Img src="https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Microphones</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/violins");
                }}
              >
                <Card.Img src="https://images.unsplash.com/photo-1508025690966-2a9a1957da31?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Violins</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/pianos");
                }}
              >
                <Card.Img src="https://images.pexels.com/photos/5427085/pexels-photo-5427085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Pianos</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Card
                style={{ width: "15rem", cursor: "pointer", border: "none" }}
                onClick={() => {
                  history.push("/collections/softwares");
                }}
              >
                <Card.Img src="https://images.pexels.com/photos/4167169/pexels-photo-4167169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>Softwares</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </CardDeck>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Categories);
