import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  InputGroup,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { isAuthenticated } from "../auth/helper";
import CartItem from "../cart/CartItem";
import Footer from "../core/Footer/Footer";
import TopBar from "../core/TopBar";
import { FaRupeeSign, FaCheckCircle } from "react-icons/fa";
import {
  cartEmpty,
  getTotalPrice,
  loadUserCartItemsFromLocalStorage,
} from "../cart/cartUtility";
import { fetchUserAddresses } from "../user/helper/userUtility";
import { Redirect } from "react-router";
import { createOrder } from "../core/helper/orderhelper";

const Checkout = () => {
  const { token, user } = isAuthenticated();

  const [cartItems, setCartItems] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [reload, setReload] = useState(false);

  const [showMyDetails, setShowMyDetails] = useState(true);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [showCartItems, setShowCartItems] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(false);

  useEffect(() => {
    async function loadUserCartAndAddress() {
      setCartItems(loadUserCartItemsFromLocalStorage());
      const userAddresses = await fetchUserAddresses(user._id, token);
      setUserAddresses(userAddresses);
    }
    loadUserCartAndAddress();
    return () => {
      loadUserCartAndAddress();
    };
  }, [reload, user._id, token]);

  const checkLoginContent = () => {
    return (
      <Row className="mb-3">
        <Card className="cardHover w-100">
          <Card.Header
            onClick={() => {
              setShowMyDetails(!showMyDetails);
            }}
            style={{
              color: "white",
              background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
            }}
          >
            <Card.Title className="m-0">
              1. My Details <FaCheckCircle />
            </Card.Title>
          </Card.Header>
          <div className={showMyDetails ? "" : "d-none"}>
            <Card.Body className="p-0">
              <Col className="my-3">
                <div className="d-flex">
                  <h6 className="text-muted mr-3">Name:</h6>
                  <h6>{user.name}</h6>
                </div>
                <div className="d-flex">
                  <h6 className="text-muted mr-3">Phone:</h6>
                  <h6>{`+91-${user.phoneNumber}`}</h6>
                </div>
              </Col>
            </Card.Body>
            <Card.Footer
              style={{
                background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
              }}
            />
          </div>
        </Card>
      </Row>
    );
  };

  const [disableAddressBtn, setDisableAddressBtn] = useState(false);

  const handleAddressClick = (addressId, address) => {
    setSelectedAddress(address);
    const deliveryCards = document.getElementById("delivery-cards");
    for (let i = 0; i < deliveryCards.children.length; i++) {
      if (deliveryCards.children[i].id === `id${addressId}`) {
        deliveryCards.children[i].style.backgroundColor = "#B9D9EB";
        setDisableAddressBtn(true);
      } else {
        deliveryCards.children[i].classList.add("d-none");
      }
    }
  };

  const deliveryAddressContent = () => {
    return (
      <Row className="mb-3">
        <Card className="cardHover w-100">
          <Card.Header
            onClick={() => {
              setShowDeliveryDetails(!showDeliveryDetails);
            }}
            style={{
              color: "white",
              background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
            }}
          >
            <Card.Title className="m-0">
              2. Delivery Address {disableAddressBtn ? <FaCheckCircle /> : ""}
            </Card.Title>
          </Card.Header>
          <div className={showDeliveryDetails ? "" : "d-none"}>
            <Card.Body className="p-0">
              <Col className="mt-1">Please choose one of the addresses.</Col>
              <InputGroup id="delivery-cards">
                {userAddresses.length === 0 ? (
                  <Card style={{ width: "100%" }}>
                    <Card.Body>Please Add Address From Profile.</Card.Body>
                  </Card>
                ) : (
                  userAddresses.map((address, index) => {
                    return (
                      <Card
                        key={address._id}
                        id={`id${index}`}
                        className="w-100 my-2 cardHover"
                      >
                        <Card.Body>
                          <Row>
                            <Col lg={3} className="d-flex align-items-center ">
                              <h6 className="mb-0 text-primary">
                                {address.name.toUpperCase()}
                              </h6>
                            </Col>
                            <Col
                              lg={3}
                              className="d-flex p-1  align-items-center"
                            >
                              <h6 className="mb-0 text-primary">{`+91-${address.mobileNo}`}</h6>
                            </Col>
                            <Col
                              lg={1}
                              className="d-flex justify-content-center align-items-center bg-primary"
                            >
                              <h6 className="mb-0 text-light">{`${address.addressType}`}</h6>
                            </Col>
                          </Row>
                          <Row className="my-2">
                            <Col lg={9}>
                              {`${address.address}, ${address.city}, ${address.state} - ${address.pincode}.`}
                              {address.alternatePhone !== "" ? (
                                <Row>
                                  <Col>{`Alternate Contact Number: +91-${address.alternatePhone}`}</Col>
                                </Row>
                              ) : (
                                ""
                              )}
                            </Col>
                            <Col>
                              <Button
                                onClick={() => {
                                  handleAddressClick(index, address);
                                }}
                                disabled={disableAddressBtn}
                                style={{
                                  margin: "0 auto",
                                  borderColor: "white",
                                  color: "white",
                                  fontWeight: "bold",
                                  background:
                                    "linear-gradient(45deg,#005C97,#363795)",
                                }}
                              >
                                {disableAddressBtn ? (
                                  <div className="d-flex">
                                    <h6 className="mb-0 mr-2">SELECTED</h6>
                                    <FaCheckCircle />
                                  </div>
                                ) : (
                                  `SELECT ADDRESS`
                                )}
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    );
                  })
                )}
              </InputGroup>
            </Card.Body>
            <Card.Footer
              style={{
                background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
              }}
            />
          </div>
        </Card>
      </Row>
    );
  };

  const cartCheckoutContent = () => {
    return (
      <Row className="mb-3">
        <Card className="cardHover w-100">
          <Card.Header
            onClick={() => {
              setShowCartItems(!showCartItems);
            }}
            style={{
              color: "white",
              background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
            }}
          >
            <Card.Title className="m-0">
              3. Order Summary <FaCheckCircle />
            </Card.Title>
          </Card.Header>
          <div className={showCartItems ? "" : "d-none"}>
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
          </div>
        </Card>
      </Row>
    );
  };

  const paymentOptionsContent = () => {
    return (
      <Row className="mb-3">
        <Card className="cardHover w-100">
          <Card.Header
            onClick={() => {
              setShowPaymentOptions(!showPaymentOptions);
            }}
            style={{
              color: "white",
              background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
            }}
          >
            <Card.Title className="m-0">
              4. Payment Options <FaCheckCircle />
            </Card.Title>
          </Card.Header>
          <div className={showPaymentOptions ? "" : "d-none"}>
            <Card.Body className="p-0">
              <ListGroup>
                <ListGroup.Item className="d-flex">
                  <h6 className="fw-bold mb-0 my-auto">CASH ON DELIVERY</h6>
                  <Button
                    disabled={true}
                    style={{
                      margin: "0 auto",
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                      background: "linear-gradient(45deg,#005C97,#363795)",
                    }}
                  >
                    <div className="d-flex">
                      <h6 className="mb-0 mr-2">SELECTED</h6> <FaCheckCircle />
                    </div>
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>Other options coming soon...</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer
              style={{
                background: "linear-gradient(45deg,#5433FF,#20BDFF,#A5FECB)",
              }}
            />
          </div>
        </Card>
      </Row>
    );
  };

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionError, setTransactionError] = useState(true);

  const paymentMethod = async () => {
    if (cartItems[0]?.cart?.length > 0 && selectedAddress) {
      setTransactionError(false);
      await createOrder(user._id, token, {
        transactionId: uuidv4(),
        orderedDate: new Date(),
        purchasedItems: cartItems,
        deliveredAddress: selectedAddress,
        totalAmount: getTotalPrice(),
        deliveryCharges: "FREE",
        paymentMethod: "CASH ON DELIVERY",
      });
      cartEmpty();
    } else {
      if (cartItems[0]?.cart?.length === 0) {
        setTransactionError({
          message: "Please add items to the cart.",
        });
      } else if (!selectedAddress) {
        setTransactionError({
          message: "Please select an address for delivery.",
        });
      }
    }
    setShowTransactionModal(true);
  };

  const [startingPayment, setStartingPayment] = useState(false);
  const [paymentCompletion, setPaymentCompletion] = useState(false);
  const [preparingReceipt, setPreparingReceipt] = useState(false);
  const [redirectingToProfile, setRedirectingToProfile] = useState(false);

  const handlePaymentStates = () => {
    const timer = (count) => {
      return new Promise((resolve) => {
        let counter = setInterval(() => {
          count = count - 1;
          if (count < 0) {
            clearInterval(counter);
            resolve();
            return;
          }
        }, 1000);
      });
    };
    async function main() {
      await timer(3);
      setStartingPayment(true);
      await timer(3);
      setPaymentCompletion(true);
      await timer(3);
      setPreparingReceipt(true);
      await timer(3);
      setRedirectingToProfile(true);
    }
    main();
  };

  const paymentModal = () => {
    const handleClose = () => {
      setShowTransactionModal(false);
    };
    if (!transactionError) {
      handlePaymentStates();
    }
    return (
      <Modal
        size="md"
        show={showTransactionModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionError ? (
            <Alert variant="danger">{transactionError.message}</Alert>
          ) : (
            <>
              <div className="my-2 ">
                <h6 className="text-danger fw-bold">
                  Please do not close the browser or hit refresh!
                </h6>
              </div>
              <div className="my-2 d-flex">
                {startingPayment ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <Spinner size="sm" variant="primary" animation="border" />
                )}
                <h6 className="mx-2 mb-0">Starting payment process...</h6>
              </div>
              <div className="my-2 d-flex">
                {paymentCompletion ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <Spinner size="sm" variant="primary" animation="border" />
                )}
                <h6 className="mx-2 mb-0">Completing payment process...</h6>
              </div>
              <div className="my-2 d-flex">
                {preparingReceipt ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <Spinner size="sm" variant="primary" animation="border" />
                )}
                <h6 className="mx-2 mb-0">Preparing the Purchase Receipt...</h6>
              </div>
              <div className="my-2 d-flex">
                {redirectingToProfile ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <Spinner size="sm" variant="primary" animation="border" />
                )}
                <h6 className="mx-2 mb-0">Redirecting to Profile Page...</h6>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  const redirectMethod = () => {
    if (redirectingToProfile) {
      return <Redirect to="/profile" />;
    }
  };

  const checkoutContent = () => {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg={8} md={12} sm={12}>
            {checkLoginContent()}
            {deliveryAddressContent()}
            {cartCheckoutContent()}
            {paymentOptionsContent()}
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
                  <Col>Total Payable</Col>
                  <Col style={{ textAlign: "right" }}>
                    <FaRupeeSign />
                    {getTotalPrice().toLocaleString("hi-IN")}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Button
                    onClick={paymentMethod}
                    style={{
                      margin: "0 auto",
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                      background: "linear-gradient(45deg,#005C97,#363795)",
                    }}
                    block
                  >
                    PAY
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
      {redirectMethod()}
      {paymentModal()}
      {checkoutContent()}
      <Footer />
    </>
  );
};

export default Checkout;
