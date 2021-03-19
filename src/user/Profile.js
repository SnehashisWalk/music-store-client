import React, { useState, useEffect } from "react";
import HomeBar from "../core/HomeBar";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Image,
  ListGroup,
  Button,
  Form,
  Jumbotron,
} from "react-bootstrap";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import { isAuthenticated } from "../auth/helper";
import Footer from "../core/Footer/Footer";
import "./profile.css";
import { userPurchaseList } from "../core/helper/orderhelper";
import { getProductImages } from "../core/helper/imageapicalls";
import CreateCategories from "../admin/CreateCategories";
import ManageCategories from "../admin/ManageCategories";
import CreateProducts from "../admin/CreateProducts";
import ManageProducts from "../admin/ManageProducts";
import ManageOrders from "../admin/ManageOrders";
import {
  deleteUserAddress,
  fetchUserAddresses,
  saveUserAddresses,
} from "./helper/userUtility";

const STATE_LIST = [
  { _id: 1, state_name: "Andaman & Nicobar Islands" },
  { _id: 2, state_name: "Andhra Pradesh" },
  { _id: 3, state_name: "Arunachal Pradesh" },
  { _id: 4, state_name: "Assam" },
  { _id: 5, state_name: "Bihar" },
  { _id: 6, state_name: "Chandigarh" },
  { _id: 7, state_name: "Chhattisgarh" },
  { _id: 8, state_name: "Dadra & Nagar Haveli & Daman & Diu" },
  { _id: 9, state_name: "Delhi" },
  { _id: 10, state_name: "Goa" },
  { _id: 11, state_name: "Gujarat" },
  { _id: 12, state_name: "Haryana" },
  { _id: 13, state_name: "Himachal Pradesh" },
  { _id: 14, state_name: "Jammu & Kashmir" },
  { _id: 15, state_name: "Jharkhand" },
  { _id: 16, state_name: "Karnataka" },
  { _id: 17, state_name: "Kerala" },
  { _id: 18, state_name: "Ladakh" },
  { _id: 19, state_name: "Lakshadweep" },
  { _id: 20, state_name: "Madhya Pradesh" },
  { _id: 21, state_name: "Maharashtra" },
  { _id: 22, state_name: "Manipur" },
  { _id: 23, state_name: "Meghalaya" },
  { _id: 24, state_name: "Mizoram" },
  { _id: 25, state_name: "Nagaland" },
  { _id: 26, state_name: "Odisha" },
  { _id: 27, state_name: "Puducherry" },
  { _id: 28, state_name: "Punjab" },
  { _id: 29, state_name: "Rajasthan" },
  { _id: 30, state_name: "Sikkim" },
  { _id: 31, state_name: "Tamil Nadu" },
  { _id: 32, state_name: "Telangana" },
  { _id: 33, state_name: "Tripura" },
  { _id: 34, state_name: "Uttarakhand" },
  { _id: 35, state_name: "Uttar Pradesh" },
  { _id: 36, state_name: "West Bengal" },
];

const Profile = () => {
  const [redirect, setRedirect] = useState(false);

  const { user } = isAuthenticated();
  const userToken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const [btn1, setBtn1] = useState(true);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [btn4, setBtn4] = useState(false);
  const [btn5, setBtn5] = useState(false);
  const [btn6, setBtn6] = useState(false);

  const [purchaseList, setPurchaseList] = useState([]);

  const [show, setShow] = useState(false);

  const [fetchedUserAddresses, setFetchedUserAddresses] = useState([]);

  const preload = async () => {
    const userAddresses = await fetchUserAddresses(userId, userToken);
    setFetchedUserAddresses(userAddresses);
  };

  useEffect(() => {
    isAuthenticated();
    preload();
  }, [redirect]);

  const loadUserPurchaseList = async () => {
    await userPurchaseList(userId, userToken)
      .then((data) => {
        setPurchaseList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addressValues, setAddressValues] = useState({
    name: "",
    mobileNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    alternatePhone: "",
    addressType: "",
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    // console.log(value);
    setAddressValues({ ...addressValues, [field]: value });
    // console.log(addressValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = await saveUserAddresses(userId, userToken, addressValues);
    if (data?.error) {
      console.log(data.error);
    } else {
      setAddressValues({
        name: "",
        mobileNo: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        alternatePhone: "",
        addressType: "",
      });
      handleClose();
      setRedirect(!redirect);
//      console.log(data.message);
    }
  };

  const handleAddAddress = () => {
    if (show) {
      return (
        <Jumbotron>
          <div className="font-weight-bold text-primary mb-3">
            ADD A NEW ADDRESS
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleChange("name")}
                  required
                  type="text"
                  value={addressValues.name}
                  placeholder="Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMobileNo">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  onChange={handleChange("mobileNo")}
                  value={addressValues.mobileNo}
                  required
                  type="text"
                  pattern="[6789][0-9]{9}"
                  minLength="10"
                  maxLength="10"
                  placeholder="10-digit mobile number"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <textarea
                onChange={handleChange("address")}
                value={addressValues.address}
                style={{ resize: "none" }}
                required
                rows="4"
                className="form-control"
                placeholder="Address (Area and Street)"
              ></textarea>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>City/District/Town</Form.Label>
                <Form.Control
                  onChange={handleChange("city")}
                  value={addressValues.city}
                  required
                  type="text"
                  placeholder="City/District/Town"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  onChange={handleChange("state")}
                  value={addressValues.state}
                  required
                  as="select"
                >
                  <option value="" disabled>
                    --Select State--
                  </option>
                  {STATE_LIST.map(({ _id, state_name }) => {
                    return (
                      <option value={state_name} key={_id}>
                        {state_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  onChange={handleChange("pincode")}
                  value={addressValues.pincode}
                  required
                  type="text"
                  pattern="[0-9]{6}"
                  minLength="6"
                  maxLength="6"
                  placeholder="Pincode"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formAltContact">
                <Form.Label>Alternate Mobile Number</Form.Label>
                <Form.Control
                  onChange={handleChange("alternatePhone")}
                  value={addressValues.alternatePhone}
                  type="text"
                  pattern="[6789][0-9]{9}"
                  minLength="10"
                  maxLength="10"
                  placeholder="Alternate Phone (Optional)"
                />
              </Form.Group>
            </Form.Row>
            <Form.Label>Address Type</Form.Label>
            <Form.Row className="mb-3">
              <Form.Group as={Col} controlId="formAddressType">
                <>
                  <input
                    type="radio"
                    id="Home"
                    name="address-type"
                    value="Home"
                    onChange={handleChange("addressType")}
                    className="mx-2"
                  />
                  <label htmlFor="Home">Home</label>

                  <input
                    type="radio"
                    id="Work"
                    name="address-type"
                    value="Work"
                    onChange={handleChange("addressType")}
                    className="mx-2"
                  />
                  <label htmlFor="Work">Work</label>
                </>
              </Form.Group>
            </Form.Row>
            <div>
              <Button type="submit" className="px-5 mx-2" variant="primary">
                Save
              </Button>
              <Button
                className="px-5"
                onClick={handleClose}
                variant="outline-primary"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Jumbotron>
      );
    }
    return (
      <Button onClick={handleShow}>
        <FaPlus /> Add Address
      </Button>
    );
  };

  const handleDeleteClick = (addressId) => {
    deleteUserAddress(userId, userToken, addressId);
    setRedirect(!redirect);
  };

  const displayCard = () => {
    if (btn1) {
      return (
        <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
          <Card.Body>
            <label>
              <h4>Personal Information</h4>
            </label>
            <div className="mt-3">
              <label>Username</label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder={user.name}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled
                />
              </InputGroup>

              <label>
                <h5>Email Address</h5>
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder={user.email}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled
                />
              </InputGroup>
              <label>
                <h5>Mobile Number</h5>
              </label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder={`+91-${user.phoneNumber}`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled
                />
              </InputGroup>
            </div>
          </Card.Body>
          <Card.Footer
            style={{
              background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
            }}
          ></Card.Footer>
        </Card>
      );
    } else if (btn2) {
      if (user.role === 1) {
        return <CreateCategories />;
      }
      return (
        <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
          <Card.Body>
            <label>
              <h4>Manage Addresses</h4>
            </label>
            <InputGroup>{handleAddAddress()}</InputGroup>
            <h5 className="mt-3">Saved Addresses</h5>
            <InputGroup>
              {fetchedUserAddresses.length === 0 ? (
                <Card style={{ width: "100%" }}>
                  <Card.Body>Please Add Address</Card.Body>
                </Card>
              ) : (
                fetchedUserAddresses.map((address, index) => {
                  return (
                    <Card key={index} className="w-100 my-3">
                      <Card.Header className="font-weight-bold">
                        {address.addressType}
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col lg={3} className="d-flex align-items-center ">
                            <h6 className="mb-0 text-primary">
                              {address.name.toUpperCase()}
                            </h6>
                          </Col>
                          <Col lg={3} className="d-flex align-items-center">
                            <h6 className="mb-0 text-primary">
                              {`+91-${address.mobileNo}`}
                            </h6>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <Button
                              onClick={() => {
                                handleDeleteClick(address._id);
                              }}
                              variant="danger"
                            >
                              DELETE
                            </Button>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>{`${address.address}, ${address.city}, ${address.state} - ${address.pincode}.`}</Col>
                        </Row>
                        {address.alternatePhone !== "" ? (
                          <Row>
                            <Col>{`Alternate Contact Number: +91-${address.alternatePhone}`}</Col>
                          </Row>
                        ) : (
                          ""
                        )}
                      </Card.Body>
                    </Card>
                  );
                })
              )}
            </InputGroup>
          </Card.Body>
          <Card.Footer
            style={{
              background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
            }}
          />
        </Card>
      );
    } else if (btn3) {
      if (user.role === 1) {
        return <ManageCategories />;
      }
      return (
        <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
          <Card.Body>
            <label>
              <h4>My Orders</h4>
            </label>
            {purchaseList.length > 0 ? (
              purchaseList.map((item, index) => {
                return (
                  <Card
                    key={index}
                    style={{ width: "100%" }}
                    className="cardHover m-2"
                  >
                    <Container>
                      <Row>
                        <Col lg={3}>
                          <Card.Img
                            style={{ height: "120px", width: "120px" }}
                            src={getProductImages(item)}
                          />
                        </Col>
                        <Col lg={5}>
                          <Card.Body>
                            <Card.Text>{item.name}</Card.Text>
                            <h6 style={{ color: "grey" }}>
                              {item.description}
                            </h6>
                            <h6>
                              <FaRupeeSign />
                              {item.amount.toLocaleString("hi-IN")}
                            </h6>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                );
              })
            ) : (
              <Card>No orders</Card>
            )}
          </Card.Body>
          <Card.Footer
            style={{
              background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
            }}
          />
        </Card>
      );
    } else if (btn4) {
      return <CreateProducts />;
    } else if (btn5) {
      return <ManageProducts />;
    } else if (btn6) {
      return <ManageOrders />;
    }
  };

  return (
    <div>
      <HomeBar />
      <Container className="mt-4">
        <Row>
          <Col lg={3} md={1} sm={3}>
            <Row>
              <Card
                style={{ width: "100%", margin: "1rem" }}
                className="shadow"
              >
                <Card.Body>
                  <Image
                    src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                    style={{ width: "50px" }}
                    rounded
                  />{" "}
                  Hello, {user.name}
                  {user.role === 1 ? (
                    <Card.Text className="text-center font-weight-bold">
                      Admin Access
                    </Card.Text>
                  ) : (
                    ""
                  )}
                </Card.Body>
                <Card.Footer
                  style={{
                    background:
                      "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
                  }}
                />
              </Card>
            </Row>
            <Row>
              <Card
                style={{ width: "100%", margin: "1rem" }}
                className="shadow"
              >
                <Card.Body>
                  <ListGroup
                    as="ul"
                    variant="flush"
                    style={{ cursor: "pointer" }}
                  >
                    <ListGroup.Item
                      as="li"
                      className="onHover"
                      active={btn1}
                      onClick={() => {
                        setBtn1(true);
                        setBtn2(false);
                        setBtn3(false);
                        setBtn4(false);
                        setBtn5(false);
                        setBtn6(false);
                      }}
                    >
                      Profile Information
                    </ListGroup.Item>
                    {user.role !== 1 ? (
                      <>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn2}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(true);
                            setBtn3(false);
                          }}
                        >
                          Manage Addresses
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn3}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(false);
                            setBtn3(true);
                            loadUserPurchaseList();
                          }}
                        >
                          My Orders
                        </ListGroup.Item>
                      </>
                    ) : (
                      <>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn2}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(true);
                            setBtn3(false);
                            setBtn4(false);
                            setBtn5(false);
                            setBtn6(false);
                          }}
                        >
                          Create Categories
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn3}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(false);
                            setBtn3(true);
                            setBtn4(false);
                            setBtn5(false);
                            setBtn6(false);
                          }}
                        >
                          Manage Categories
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn4}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(false);
                            setBtn3(false);
                            setBtn4(true);
                            setBtn5(false);
                            setBtn6(false);
                          }}
                        >
                          Create Products
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn5}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(false);
                            setBtn3(false);
                            setBtn4(false);
                            setBtn5(true);
                            setBtn6(false);
                          }}
                        >
                          Manage Products
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="onHover"
                          active={btn6}
                          onClick={() => {
                            setBtn1(false);
                            setBtn2(false);
                            setBtn3(false);
                            setBtn4(false);
                            setBtn5(false);
                            setBtn6(true);
                          }}
                        >
                          Manage Orders
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Card.Body>
                <Card.Footer
                  style={{
                    background:
                      "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
                  }}
                />
              </Card>
            </Row>
          </Col>
          <Col>
            <Row>{displayCard()}</Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
