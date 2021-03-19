import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, createProduct } from "./helper/adminapicalls";

const CreateProducts = () => {
  const { token, user } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    error,
    createdProduct,
    formData,
  } = values;

  useEffect(() => {
    preload();
  }, []);

  const preload = async () => {
    await getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        subcategories.push(
          categories.map((categoryObj) => categoryObj.subCategories)
        );
      }
    });
  };

  const handleChange = (name) => (event) => {
    if (event.target.value === "Select") return;
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    if (name === "category" && event.target.value !== "Select") {
      handleSubCategories(event.target.value);
    }
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    let data = await createProduct(user._id, token, formData);
    if (data.error) {
      setValues({
        ...values,
        error: data.error,
        loading: false,
      });
    } else {
      setValues({
        ...values,
        name: "",
        description: "",
        price: "",
        photo: "",
        stock: "",
        loading: false,
        error: false,
        createdProduct: data.name,
      });
    }
    resetFields();
  };

  const resetFields = () => {
    document.querySelector("#productImage").value = "";
    setTimeout(() => {
      setValues({
        ...values,
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        formData: new FormData(),
      });
    }, 2500);
  };

  const [subCategoryFieldState, setSubCategoryFieldState] = useState(true);
  const [subcategories, setSubcategories] = useState([]);

  const handleSubCategories = (categoryId) => {
    if (categories.length > 0) {
      categories.map((category) => {
        if (category._id === categoryId) {
          if (category.subCategories.length > 0) {
            setSubcategories(category.subCategories);
            setSubCategoryFieldState(false);
          } else {
            setSubcategories([]);
            setSubCategoryFieldState(true);
          }
        }
      });
    }
  };

  const form = () => {
    return (
      <Form>
        {error ? (
          <Alert variant="danger">
            <Spinner animation="border" variant="danger" /> Error: {error}
          </Alert>
        ) : createdProduct ? (
          <Alert variant="success">
            {createdProduct} created successfully.
          </Alert>
        ) : (
          ""
        )}
        <Form.Group as={Row}>
          <Col>
            <Form.File
              id="productImage"
              label="Product Image"
              disabled={error}
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="productName">
          <Form.Label column>Name</Form.Label>
          <Col lg={10}>
            <Form.Control
              autoFocus
              disabled={error}
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleChange("name")}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="productDescription">
          <Form.Label column>Description</Form.Label>
          <Col lg={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              disabled={error}
              value={description}
              onChange={handleChange("description")}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="productPrice">
          <Form.Label column>Price</Form.Label>
          <Col lg={10}>
            <Form.Control
              type="text"
              placeholder="Price"
              value={price}
              disabled={error}
              onChange={handleChange("price")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="productCategory">
          <Form.Label column>Category</Form.Label>
          <Col lg={10}>
            <Form.Control
              as="select"
              onChange={handleChange("category")}
              disabled={error}
              value={category}
            >
              <option>Select</option>
              {categories &&
                categories.map((category, index) => {
                  return (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="productSubCategory">
          <Form.Label column>Sub-Category</Form.Label>
          <Col lg={10}>
            <Form.Control
              as="select"
              onChange={handleChange("subCategory")}
              disabled={error || subCategoryFieldState}
            >
              <option>Select</option>
              {subcategories &&
                subcategories.map((subcategory, index) => {
                  return (
                    <option key={index} value={subcategory[0]}>
                      {subcategory[0]}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="productQuantity">
          <Form.Label column>Quantity</Form.Label>
          <Col lg={10}>
            <Form.Control
              type="number"
              placeholder="Quantity"
              disabled={error}
              value={stock}
              onChange={handleChange("stock")}
            />
          </Col>
        </Form.Group>
        <Button
          variant={error ? "danger" : "primary"}
          type="submit"
          block
          onClick={onSubmit}
        >
          {error ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              {error} Retry ...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </Form>
    );
  };

  return (
    <>
      <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
        <Card.Body>
          <label>
            <h4>Create Products</h4>
          </label>
          {form()}
        </Card.Body>
        <Card.Footer
          style={{
            background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
          }}
        />
      </Card>
    </>
  );
};

export default CreateProducts;
