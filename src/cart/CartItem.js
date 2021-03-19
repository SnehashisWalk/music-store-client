import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import { getProductImages } from "../core/helper/imageapicalls";
import {
  updateCartItemCount,
  getUniqueItemCount,
  removeCartItem,
} from "./cartUtility";
import { FaMinus, FaPlus, FaRupeeSign } from "react-icons/fa";

const CartItem = (props) => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  useEffect(() => {
    setNumberOfItems(props.cartItem.productDetails.productQuantity);
  }, []);
  return (
    <Container>
      <Card border="light">
        <Row>
          <Col lg={3} md={3} sm={6} xs={6}>
            <Card.Img
              className="d-block mx-auto"
              style={{ height: "120px", width: "120px" }}
              src={getProductImages(props.cartItem)}
            />
          </Col>
          <Col lg={5} md={5} sm={6} xs={6}>
            <Card.Body>
              <Card.Text className="font-weight-bold">
                {props.cartItem.productDetails.productName}
              </Card.Text>
              <Card.Text style={{ color: "grey" }}>
                {props.cartItem.productDetails.productDescription}
              </Card.Text>
              <Card.Text>
                <FaRupeeSign />{" "}
                {(
                  props.cartItem.productDetails.productPrice *
                  props.cartItem.productDetails.productQuantity
                ).toLocaleString("hi-IN")}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginBottom: "5px",
                  paddingTop: "20px",
                  width: "100%",
                }}
              >
                <Button
                  disabled={numberOfItems === 1 ? true : false}
                  style={{
                    color: "white",
                    background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                  }}
                  onClick={() => {
                    if (numberOfItems !== 1) {
                      setNumberOfItems((prevState) => prevState - 1);
                      updateCartItemCount(
                        props.cartItem._id,
                        numberOfItems - 1
                      );
                      props.setReload(!props.reload);
                    } else {
                      setNumberOfItems(1);
                      updateCartItemCount(props.cartItem._id, numberOfItems);
                      props.setReload(!props.reload);
                    }
                  }}
                >
                  <FaMinus />
                </Button>
                <InputGroup style={{ width: "50px" }}>
                  <FormControl
                    disabled
                    className="text-center"
                    placeholder={numberOfItems}
                  />
                </InputGroup>
                <Button
                  style={{
                    color: "white",
                    background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                  }}
                  onClick={() => {
                    setNumberOfItems((prevState) => prevState + 1);
                    updateCartItemCount(props.cartItem._id, numberOfItems + 1);
                    props.setReload(!props.reload);
                  }}
                >
                  <FaPlus />
                </Button>
              </div>
            </Row>
            <Row className="my-2 mx-0">
              <Button
                block
                className="px-5 py-2"
                style={{
                  margin: "0 auto",
                  color: "white",
                  background: "linear-gradient(45deg,#FF416C,#FF4B2B)",
                }}
                variant="danger"
                onClick={() => {
                  props.setReload(!props.reload);
                  removeCartItem(props.cartItem._id);
                }}
              >
                Remove
              </Button>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CartItem;
