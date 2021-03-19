import React from "react";
import { Card, Dropdown } from "react-bootstrap";

const form = () => {
  return (
    <>
      <div className="mb-2">Select a category.</div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const ManageProducts = () => {
  return (
    <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
      <Card.Body>
        <label>
          <h4>Manage Products</h4>
        </label>
        {form()}
      </Card.Body>
      <Card.Footer
        style={{
          background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
        }}
      />
    </Card>
  );
};

export default ManageProducts;
