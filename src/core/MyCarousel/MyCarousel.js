import React, { useState, useLayoutEffect } from "react";
import { CarouselData } from "./CarouselData";
import Carousel from "react-bootstrap/Carousel";
import { Col } from "react-bootstrap";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const MyCarousel = () => {
  const [index, setIndex] = useState(0);

  const [customWidth, customHeight] = useWindowSize();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // console.log("PLATFORM", navigator.platform);

  return (
    <Col className="d-flex justify-content-center">
      {navigator.platform == "Win32" ? (
        <>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="d-block active mx-5 my-3"
            style={{
              width:
                customHeight > 500
                  ? "100%"
                  : customHeight > 430
                  ? "80%"
                  : customHeight > 400
                  ? "75%"
                  : "60%",
              height:
                customWidth > 768
                  ? "75vh"
                  : customWidth > 576
                  ? "50vh"
                  : "100vh",
            }}
          >
            {CarouselData.map((carouselItem, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-none d-sm-block"
                    src={carouselItem.imageDesktop}
                    alt={carouselItem.title}
                    title="New Releases"
                    style={{
                      width: customWidth > 768 ? "inherit" : "",
                      height:
                        customWidth > 768
                          ? "75vh"
                          : customWidth > 576
                          ? "50vh"
                          : "100vh",
                    }}
                  />
                  <img
                    className="d-block d-sm-none"
                    alt={carouselItem.title}
                    src={carouselItem.imageMobile}
                    title="New Releases"
                    style={{ height: "100vh" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </>
      ) : (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="d-lg-none active m-3"
          style={{ height: "50vh" }}
        >
          {CarouselData.map((carouselItem, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  src={carouselItem.imageMobile}
                  title="New Releases"
                  style={{ height: "50vh" }}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </Col>
  );
};

export default MyCarousel;
