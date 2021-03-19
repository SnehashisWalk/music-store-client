import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import HomeBar from "../../core/HomeBar";
import MyCarousel from "../../core/MyCarousel/MyCarousel";
import Footer from "../../core/Footer/Footer";
import { getProducts } from "../../core/helper/coreapicalls";
import Skeleton from "react-loading-skeleton";
import { getProductImages } from "../../core/helper/imageapicalls";
import { withRouter } from "react-router";
import { isAuthenticated } from "../../auth/helper";
import { addItemtoCart } from "../../cart/cartUtility";
import { FaRupeeSign } from "react-icons/fa";

const AcousticGuitars = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadAllProduct = async () => {
    await getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setProducts(data);
          setDataLoaded(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  const productsMap = new Map();

  dataLoaded &&
    products.forEach((ele) => {
      let key = [];
      if (productsMap.size === 0) {
        if (ele.subCategory === undefined) {
          key.push(ele);
          productsMap.set(ele.category.name, key);
        } else {
          key.push(ele);
          productsMap.set(ele.subCategory, key);
        }
      } else {
        if (
          ele.subCategory === undefined &&
          productsMap.has(ele.category.name)
        ) {
          key.push(...productsMap.get(ele.category.name));
          key.push(ele);
          productsMap.set(ele.category.name, key);
        } else if (productsMap.has(ele.subCategory)) {
          key.push(...productsMap.get(ele.subCategory));
          key.push(ele);
          productsMap.set(ele.subCategory, key);
        } else {
          if (ele.subCategory === undefined) {
            key.push(ele);
            productsMap.set(ele.category.name, key);
          } else {
            key.push(ele);
            productsMap.set(ele.subCategory, key);
          }
        }
      }
    });

  const handleClick = (product) => {
    if (isAuthenticated()) {
      history.push("/user/cart");
      addItemtoCart({ product });
    } else {
      history.push("/cart");
      addItemtoCart({ product });
    }
  };

  return (
    <>
      <HomeBar />
      <MyCarousel />
      <div className="d-block m-5">
        <h4
          style={{
            padding: "5px 5px 5px 15px",
            color: "white",
            backgroundImage: "linear-gradient(to right,#f12711, #f5af19)",
            cursor: "pointer",
          }}
        >
          Acoustic Guitars
        </h4>
      </div>
      {dataLoaded ? (
        <Container>
          <Row>
            {productsMap.get("Acoustic Guitars").map((item) => {
              return (
                <Col lg={3} className="p-3 text-center" key={item._id}>
                  <Card className="cardHover">
                    <Card.Body>
                      {dataLoaded ? (
                        <div
                          style={{
                            width: "211px",
                            height: "211px",
                            overflow: "hidden",
                            margin: "auto",
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={getProductImages(item)}
                          />
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                      <h6>{dataLoaded ? item.name : <Skeleton />}</h6>
                      <h5 style={{ color: "#de0101" }}>
                        <FaRupeeSign />
                        {dataLoaded ? (
                          `${item.price.toLocaleString("hi-IN")}`
                        ) : (
                          <Skeleton />
                        )}
                      </h5>
                      {dataLoaded ? (
                        <Button
                          block
                          style={{
                            borderColor: "white",
                            color: "white",
                            background:
                              "linear-gradient(45deg,#11998e,#38ef7d)",
                          }}
                          onClick={() => {
                            handleClick(item);
                          }}
                        >
                          Add to Card
                        </Button>
                      ) : (
                        <Skeleton />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="d-block my-5">
            <Skeleton />
          </Row>
          <Row
            className="p-2"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Col lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <Skeleton height={150} width={150} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <Skeleton height={150} width={150} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <Skeleton height={150} width={150} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card>
                <Card.Body className="text-center">
                  <Skeleton height={150} width={150} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

      <Footer />
    </>
  );
};

export default withRouter(AcousticGuitars);
