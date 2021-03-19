import HomeBar from "./HomeBar";
import React from "react";
import MyCarousel from "./MyCarousel/MyCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "./Categories/Categories";
import Footer from "./Footer/Footer";
import Brands from "./Brands/Brands";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
      <div>
        <HomeBar />
      </div>
      <MyCarousel />
      <Categories />
      <Brands />
      <Footer />
    </>
  );
}

export default Home;
