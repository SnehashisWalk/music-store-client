import React, { useState, useEffect } from "react";
import {
  Card,
  FormControl,
  InputGroup,
  Button,
  Accordion,
  ListGroup,
  Alert,
  Modal,
  Spinner,
  ListGroupItem,
  Col,
  Row,
} from "react-bootstrap";
import { isAuthenticated } from "../auth/helper";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "./helper/adminapicalls";
import { FaTrash } from "react-icons/fa";

const CreateCategories = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState({});
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subSuccess, setSubSuccess] = useState(false);

  const { token, user } = isAuthenticated();

  useEffect(() => {
    displayAllCategories();
  }, []);

  useEffect(() => {
    displayAllCategories();
  }, [reload]);

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    if (name === "") {
      setError(true);
      setErrorMessage("Field cannot be empty");
    } else {
      createCategory(user._id, token, { name }).then((data) => {
        //console.log("DATA", data);
        if (data.error) {
          setError(true);
          setErrorMessage(data.error);
        } else {
          setCategoryName(data.category);
          //console.log(subCategories, name);
          setError(false);
          setErrorMessage("");
          setSuccess(true);
          setName("");
          setReload(!reload);
          setShow(true);
        }
      });
    }
  };

  const displayAllCategories = async () => {
    await getAllCategories().then((data) => {
      if (data.error) {
        //console.log(data.error);
      } else {
        setLoaded(true);
        setCategories(data);
      }
    });
  };

  const displayAccordion = () => {
    return loaded ? (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              All Categories
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <ListGroup>
              {categories.map((category, index) => {
                return (
                  <ListGroup.Item key={index}>{category.name}</ListGroup.Item>
                );
              })}
            </ListGroup>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ) : (
      ""
    );
  };

  const setStateFalse = () => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1500);
    } else if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };

  const onSubmitModal = () => {
    const handleClose = () => {
      setSubSuccess(false);
      setShow(false);
    };

    const handleOnInputChange = (event) => {
      setSubCategory(event.target.value);
    };

    //console.log("sC", subCategory);

    const handleAddSubCategory = () => {
      let arr = new Array();
      arr.push(subCategory);
      setSubCategoryList([...subCategoryList, arr]);
      setSubCategory("");
      //console.log("arr", subCategoryList);
    };

    const handleSubCategoryDelete = (deletedSubCategory) => {
      setSubCategoryList(
        subCategoryList.filter((x) => {
          return x[0] !== deletedSubCategory;
        })
      );
    };

    const handleSaveChanges = async () => {
      //console.log(categoryName);
      const updatedCategory = {
        name: categoryName.name,
        subCategories: subCategoryList,
      };
      //console.log(updatedCategory);
      await updateCategory(user._id, categoryName, token, updatedCategory).then(
        (data) => {
          if (data.error) {
            console.log("PROMISE ERROR", data.error);
          } else {
            setSubSuccess(true);
            setSubCategoryList([]);
            //console.log("PROMISE RES", data);
          }
        }
      );
    };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add sub-category to the category.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            {subSuccess
              ? `Changes saved successfully.`
              : `Category ${categoryName.name} created successfully.`}
          </Alert>
          <InputGroup>
            <FormControl
              disabled={subSuccess}
              placeholder="Enter sub category"
              onChange={handleOnInputChange}
              value={subCategory}
            />
            <Button disabled={subSuccess} onClick={handleAddSubCategory}>
              Add
            </Button>
          </InputGroup>
          <ListGroup>
            {subCategoryList.length > 0
              ? subCategoryList.map((s, i) => {
                  return (
                    <ListGroupItem key={i}>
                      <Row>
                        <Col lg={9}>{s}</Col>
                        <Col>
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleSubCategoryDelete(s);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })
              : ""}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={subSuccess}
            variant={subSuccess ? "success" : "primary"}
            onClick={handleSaveChanges}
          >
            {subSuccess ? `Changes Saved` : `Save Changes`}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const form = () => {
    return (
      <div style={{ lineHeight: "4" }}>
        <div>Enter the Category</div>
        {error ? (
          <Alert variant="danger">
            <Spinner animation="border" variant="danger" /> {errorMessage}
            {setStateFalse()}
          </Alert>
        ) : success ? (
          <Alert variant="success">
            <Spinner animation="border" variant="success" /> Category created
            successfully.
            {setStateFalse()}
          </Alert>
        ) : (
          ""
        )}
        <InputGroup>
          <FormControl
            autoFocus
            required
            onChange={handleChange}
            value={name}
            disabled={error || success}
            placeholder="for example: Guitar"
          />
        </InputGroup>
        <div>
          <Button
            variant={error ? "danger" : "primary"}
            disabled={error || success}
            onClick={onSubmit}
          >
            {error ? `Retry...` : `Create Category`}
          </Button>
        </div>
        <div>{displayAccordion()}</div>
      </div>
    );
  };

  return (
    <>
      <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
        <Card.Body>
          <label>
            <h4>Create Categories</h4>
          </label>
          {form()}
        </Card.Body>
        <Card.Footer
          style={{
            background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
          }}
        />
      </Card>
      {onSubmitModal()}
    </>
  );
};

export default CreateCategories;
