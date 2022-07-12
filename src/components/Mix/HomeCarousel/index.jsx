import React from "react";
import { Carousel } from "antd";
import Banner1 from "../../../img/banner1.jpg";
import Banner2 from "../../../img/banner2.jpg";
import Banner3 from "../../../img/banner3.jpg";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const HomeCarousel = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img src={Banner1} alt="" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src={Banner2} alt="" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src={Banner3} alt="" />
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
