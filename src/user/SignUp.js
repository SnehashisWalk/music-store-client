import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { signup } from "../auth/helper";

const SignUp = (props) => {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });
  const { name, phoneNumber, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    // console.log("NAME", name);
    // console.log("EVENT", event.target.value);
    if (name === "phoneNumber" && event.target.value.length !== 10)
      setValues({
        ...values,
        [name]: event.target.value,
        error: "Please enter 10 digit phone number",
      });
    else setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, phoneNumber, email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors[0].msg, success: false });
        } else if (data.err) {
          setValues({ ...values, error: data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <Modal
        {...props}
        size="md"
        centered
        onExit={() => {
          setValues({
            ...values,
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            error: false,
          });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" style={{ display: success ? "" : "none" }}>
            Sign Up Successful! Please Sign in from home page.
          </Alert>
          <Alert variant="danger" style={{ display: error ? "" : "none" }}>
            {error}
          </Alert>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={handleChange("name")}
                value={name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="+91 ..."
                onChange={handleChange("phoneNumber")}
                value={phoneNumber}
              />
            </Form.Group>
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

            <Button onClick={onSubmit} variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return <>{signUpForm()}</>;
};

export default SignUp;
