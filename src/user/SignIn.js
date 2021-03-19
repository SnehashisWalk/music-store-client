import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { signin, isAuthenticated, authenticate } from "../auth/helper/index";
import {
  loadUserCartItemsFromDB,
  saveUserCartItemsToLocalStorage,
} from "../cart/cartUtility";

const SignIn = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });
  const [redirect, setRedirect] = useState(false);
  const { email, password, error, loading } = values;
  const { token, user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors[0].msg, loading: false });
        } else if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
            });
          });
          setTimeout(() => {
            setRedirect(true);
          }, 1000);
        }
      })
      .catch((error) => console.log("signin in request failed", error));
  };

  const performRedirect = () => {
    if (redirect) {
      if (user && user.role === 1) {
        window.location.href = "/";
      } else {
        window.location.href = "/";
        //return <Redirect to="/" />;
      }
    }
  };

  const signInForm = () => {
    if (isAuthenticated() && !localStorage.getItem("cartItems")) {
      loadUserCartItemsFromDB(user._id, token).then((data) => {
        saveUserCartItemsToLocalStorage(data);
        setValues({ ...values, loading: false });
      });
    }
    return (
      <Modal
        show={redirect ? false : props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExit={() => {
          setValues({ ...values, email: "", password: "", error: false });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Signin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Alert
                  variant="success"
                  style={{ display: loading ? "" : "none" }}
                >
                  Sign in Successful! Loading page...{" "}
                  <Spinner animation="border" />
                </Alert>
                <Alert
                  variant="danger"
                  style={{ display: error ? "" : "none" }}
                >
                  {error}
                </Alert>
                <Form>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={handleChange("email")}
                      value={email}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={handleChange("password")}
                      value={password}
                    />
                  </Form.Group>

                  <Button variant="warning" type="submit" onClick={onSubmit}>
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      {signInForm()} {performRedirect()}
    </>
  );
};

export default SignIn;
