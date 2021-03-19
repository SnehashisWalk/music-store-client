import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  ListGroup,
  Modal,
  Spinner,
  InputGroup,
  FormControl,
  Alert,
  FormGroup,
  FormLabel,
  ListGroupItem,
} from "react-bootstrap";
import { isAuthenticated } from "../auth/helper";
import { FaClipboardCheck, FaTrash } from "react-icons/fa";
import {
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "./helper/adminapicalls";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [deletedCategory, setDeletedCategory] = useState("");
  const [toDelete, setToDelete] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [secModal, setSecModal] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [subCategorySelected, setSubCategorySelected] = useState("");
  const [subCategoryToUpdate, setSubCategoryToUpdate] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);

  const { token, user } = isAuthenticated();

  useEffect(() => {
    displayAllCategories();
  }, []);

  useEffect(() => {
    displayAllCategories();
  }, [success]);

  const displayAllCategories = async () => {
    await getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
        setLoaded(true);
      }
    });
  };

  const displayCategoriesList = () => {
    return (
      <ListGroup>
        {loaded
          ? categories.map((category, index) => {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col lg={6}>{category.name}</Col>
                    <Col
                      lg={6}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setUpdatedCategory(category);
                          setToUpdate(true);
                          setShow(true);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeletedCategory(category);
                          setToDelete(true);
                          setShow(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })
          : "No categories found, please add a category."}
      </ListGroup>
    );
  };
  /*
    *****************************************
    PRIMARY MODAL: TO HANDLE CATEGORY UPDATES
    *****************************************
  */
  const handleUpdateClick = () => {
    const handleClose = () => {
      setSuccess(false);
      setError(false);
      setErrorMessage("");
      setName("");
      setShow(false);
      setToDelete(false);
      setToUpdate(false);
      setSubCategorySelected("");
      setSubCategoryToDelete(false);
      setSubCategoryToUpdate(false);
    };

    const handleSubCategoryClick = (subCategoryToUpdate) => {
      //console.log(subCategoryToUpdate);
      setSubCategorySelected(subCategoryToUpdate);
    };

    const handleAddSubCategoryClick = () => {
      setSecModal(true);
      setAddSubCategory(true);
    };

    return (
      <>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {toUpdate ? "Update Category" : toDelete ? "Delete Category" : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error ? (
              <Alert variant="danger">{errorMessage}</Alert>
            ) : success ? (
              <Alert variant="success">
                Category {toUpdate ? "updated" : toDelete ? "deleted" : ""}{" "}
                successfully.
              </Alert>
            ) : (
              ""
            )}
            {toUpdate ? (
              <>
                <InputGroup>
                  <FormControl disabled placeholder={updatedCategory.name} />
                </InputGroup>
                <InputGroup>
                  <FormControl
                    placeholder="Update category name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </InputGroup>
                <FormGroup>
                  <FormLabel>Update sub-category</FormLabel>
                  {updatedCategory.subCategories.length > 0 ? (
                    <ListGroup>
                      {updatedCategory.subCategories.map((sub, index) => {
                        return (
                          <ListGroupItem key={index}>
                            <Row>
                              <Col lg={7}>{sub[0]}</Col>
                              <Col>
                                <Button
                                  onClick={() => {
                                    setSecModal(true);
                                    setSubCategoryToUpdate(true);
                                    handleSubCategoryClick(sub[0]);
                                  }}
                                >
                                  <FaClipboardCheck />
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  variant="danger"
                                  onClick={() => {
                                    setSecModal(true);
                                    setSubCategoryToDelete(true);
                                    handleSubCategoryClick(sub[0]);
                                  }}
                                >
                                  <FaTrash />
                                </Button>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </>
            ) : toDelete ? (
              <InputGroup>
                <FormControl disabled placeholder={deletedCategory.name} />
              </InputGroup>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={success} onClick={handleAddSubCategoryClick}>
              Add sub-category
            </Button>
            {toUpdate ? (
              <Button
                variant="primary"
                disabled={success}
                onClick={handleUpdateSave}
              >
                {success ? "Changes Saved" : "Save Changes"}
              </Button>
            ) : toDelete ? (
              <Button
                variant="danger"
                disabled={success}
                onClick={handleDeleteSave}
              >
                {success ? "Category Deleted" : "Delete"}
              </Button>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const handleUpdateSave = async (event) => {
    event.preventDefault();
    if (name === "") {
      setError(true);
      setErrorMessage("Field cannot be empty");
    } else {
      const saveCategory = {
        name,
        subCategories: updatedCategory.subCategories,
      };
      await updateCategory(user._id, updatedCategory, token, saveCategory)
        .then((data) => {
          if (data.error) {
            setError(true);
            setErrorMessage(data.error);
          } else {
            //console.log(data);
            setError(false);
            setErrorMessage("");
            setSuccess(true);
          }
        })
        .catch((err) => console.log(err));
      setName("");
    }
  };

  const handleDeleteSave = async (event) => {
    event.preventDefault();
    await deleteCategory(user._id, token, deletedCategory)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          //console.log(data);
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  /*
  ***********************************************
  SECONDARY MODAL: TO HANDLE SUB CATEGORY UPDATES
  ***********************************************
  */
  const showSecondaryModal = () => {
    const handleClose = () => {
      setSecModal(false);
      setSubCategory("");
      setAddSubCategory(false);
      setSubCategoryToDelete(false);
      setSubCategoryToUpdate(false);
    };

    const handleSecModalChange = (event) => {
      setSubCategory(event.target.value);
    };

    const handleSecModalSaveChanges = () => {
      if (!subCategory.length > 0) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1500);
      } else {
        let saveChanges;
        if (addSubCategory) {
          const subCategoryList = updatedCategory.subCategories;
          const arr = new Array(subCategory);
          subCategoryList.push(arr);
          saveChanges = {
            ...updatedCategory,
            subCategories: subCategoryList,
          };
        } else {
          saveChanges = updatedCategory;

          saveChanges.subCategories.map((ele) => {
            if (ele[0] === subCategorySelected) {
              ele[0] = subCategory;
            }
          });
        }
        //console.log(saveChanges);
        setSuccess(true);
        setError(false);
        setUpdatedCategory(saveChanges);
        setSubCategory("");
        setTimeout(() => {
          setAddSubCategory(false);
          setSuccess(false);
          setSecModal(false);
          handleClose();
        }, 1500);
      }
    };

    const handleSecModalDelete = () => {
      const saveChanges = updatedCategory;

      saveChanges.subCategories = saveChanges.subCategories.filter((ele) => {
        return ele[0] !== subCategorySelected;
      });

      setUpdatedCategory(saveChanges);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSecModal(false);
        handleClose();
      }, 1500);
    };

    return (
      <Modal
        show={secModal}
        onHide={handleClose}
        centered={true}
        enforceFocus={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {subCategoryToUpdate
              ? "Update sub-category"
              : subCategoryToDelete
              ? "Delete sub-category"
              : addSubCategory
              ? "Add sub-category"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? <Alert variant="danger">Field cannot be empty!</Alert> : ""}
          {subCategoryToUpdate ? (
            <InputGroup>
              <FormControl
                autoFocus
                disabled={error || success}
                placeholder={subCategorySelected}
                value={subCategory}
                onChange={handleSecModalChange}
              />
            </InputGroup>
          ) : subCategoryToDelete ? (
            <InputGroup>
              <FormControl disabled placeholder={subCategorySelected} />
            </InputGroup>
          ) : addSubCategory ? (
            <InputGroup>
              <FormControl
                autoFocus
                disabled={error || success}
                placeholder="Enter sub-category name."
                value={subCategory}
                onChange={handleSecModalChange}
              />
            </InputGroup>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {subCategoryToUpdate ? (
            <Button
              disabled={error || success}
              variant={error ? "danger" : success ? "success" : "primary"}
              onClick={handleSecModalSaveChanges}
            >
              {error ? (
                <>
                  <Spinner animation="grow" size="sm" /> Retry...
                </>
              ) : success ? (
                <>
                  <Spinner animation="grow" size="sm" /> Saving...
                </>
              ) : (
                `Save Changes`
              )}
            </Button>
          ) : subCategoryToDelete ? (
            <Button
              variant="danger"
              disabled={success}
              onClick={handleSecModalDelete}
            >
              {success ? (
                <>
                  <Spinner animation="grow" size="sm" /> Deleting...
                </>
              ) : (
                `Delete`
              )}
            </Button>
          ) : addSubCategory ? (
            <Button
              disabled={error || success}
              variant={error ? "danger" : success ? "success" : "primary"}
              onClick={handleSecModalSaveChanges}
            >
              {error ? (
                <>
                  <Spinner animation="grow" size="sm" /> Retry...
                </>
              ) : success ? (
                <>
                  <Spinner animation="grow" size="sm" /> Saving...
                </>
              ) : (
                `Save Changes`
              )}
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    );
  };

  const form = () => {
    return (
      <div style={{ lineHeight: "4" }}>
        <div>Update and Delete the categories.</div>
        {loaded ? displayCategoriesList() : <Spinner border="grow" />}
      </div>
    );
  };

  return (
    <>
      <Card style={{ width: "100%", margin: "1rem" }} className="shadow">
        <Card.Body>
          <label>
            <h4>Manage Categories</h4>
          </label>
          {form()}
        </Card.Body>
        <Card.Footer
          style={{
            background: "linear-gradient(45deg,#12c2e9,#c471ed,#f64f59)",
          }}
        />
      </Card>
      {handleUpdateClick()}
      {showSecondaryModal()}
    </>
  );
};

export default ManageCategories;
