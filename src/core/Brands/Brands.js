import React from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import { BrandData } from "./BrandsData";
const Brands = () => {
  return (
    <>
      <div style={{ margin: "3rem", textAlign: "center" }}>
        <h3>Top Brands</h3>
      </div>
      <Container>
        <Row>
          {BrandData.map((item) => {
            return (
              <Col lg={1} md={2} sm={2} xs={2} key={item.id} className="m-2">
                <Card bg="light" border="light">
                  <Card.Img src={item.image} alt={item.title} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Brands;
