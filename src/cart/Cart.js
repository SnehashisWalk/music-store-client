import React, { useState, useEffect } from "react";
import Footer from "../core/Footer/Footer";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import {
  getTotalPrice,
  // cartItemCount,
  // saveUserCartItems,
  // loadUserCartItemsFromDB,
  // saveUserCartItemsToLocalStorage,
  loadUserCartItemsFromLocalStorage,
} from "./cartUtility";
import CartItem from "./CartItem";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import TopBar from "../core/TopBar";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Cart = ({ history }) => {
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setCartItems(loadUserCartItemsFromLocalStorage());
  }, [reload]);

  // console.log("USER CART", cartItems);

  const cartContent = () => {
    return !cartItems[0] ? (
      ""
    ) : cartItems[0]?.cart?.length === 0 ? (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Header
                style={{
                  color: "white",
                  background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
                }}
              >
                My Cart
              </Card.Header>

              <Card.Body
                style={{
                  textAlign: "center",
                }}
              >
                <FaShoppingCart />
                <div style={{ marginTop: "10px" }}>
                  <Card.Title>Your cart is empty!</Card.Title>
                  <Card.Title>Add items to it now.</Card.Title>
                </div>
                <Link to="/">
                  <Button
                    className="px-5 py-3 mt-3"
                    style={{
                      borderColor: "white",
                      color: "white",
                      background: "linear-gradient(45deg,#11998e,#38ef7d)",
                    }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Card.Body>
              <Card.Footer
                style={{
                  background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
                }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    ) : (
      <Container className="mt-5">
        <Row>
          <Col lg={8} md={12} sm={12}>
            <Card className="cardHover">
              <Card.Header
                style={{
                  color: "white",
                  background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
                }}
              >
                <Card.Title className="m-0">My Cart</Card.Title>
              </Card.Header>
              <Card.Body className="p-0">
                {cartItems[0]?.cart?.map((cartItem, index) => {
                  return (
                    <CartItem
                      key={index}
                      cartItem={cartItem}
                      reload={reload}
                      setReload={setReload}
                    />
                  );
                })}
              </Card.Body>
              <Card.Footer
                style={{
                  background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
                }}
              />
            </Card>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <Card className="cardHover">
              <Card.Header
                style={{
                  color: "white",
                  background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
                }}
              >
                <Card.Title className="m-0">Price Details</Card.Title>
              </Card.Header>

              <Card.Body style={{ lineHeight: "3" }}>
                <Row>
                  <Col lg={8} md={6} sm={6} xs={6}>
                    {/* <Card.Text>Price ({cartItemCount()} items)</Card.Text> */}
                    <Card.Text>
                      Price ({cartItems[0]?.cart?.length} items)
                    </Card.Text>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Card.Text>
                      <FaRupeeSign />
                      {getTotalPrice().toLocaleString("hi-IN")}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={6} sm={6} xs={6}>
                    <Card.Text>Delivery Charges</Card.Text>
                  </Col>
                  <Col style={{ textAlign: "right", color: "#388e3c" }}>
                    <Card.Text>FREE</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row className="font-weight-bold">
                  <Col>Total Amount</Col>
                  <Col style={{ textAlign: "right" }}>
                    <FaRupeeSign />
                    {getTotalPrice().toLocaleString("hi-IN")}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Button
                    block
                    className="py-3"
                    style={{
                      margin: "0 auto",
                      borderColor: "white",
                      color: "white",
                      background: "linear-gradient(45deg,#11998e,#38ef7d)",
                    }}
                    onClick={() => {
                      const path = "/cart/checkout";
                      if (isAuthenticated()) {
                        history.push(path);
                      } else {
                        history.push("/");
                      }
                    }}
                  >
                    {isAuthenticated() ? "Checkout" : "Signin to checkout."}
                  </Button>
                </Row>
              </Card.Body>

              <Card.Footer
                style={{
                  background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
                }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <TopBar />
      {cartContent()}
      <Footer />
    </>
  );
};

export default withRouter(Cart);
