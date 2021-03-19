import React from "react";
import { Card } from "react-bootstrap";

const ManageOrders = () => {
  return (
    <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
      <Card.Body>
        <label>
          <h4>Manage Orders</h4>
        </label>
      </Card.Body>
      <Card.Footer
        style={{
          background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
        }}
      />
    </Card>
  );
};
export default ManageOrders;
