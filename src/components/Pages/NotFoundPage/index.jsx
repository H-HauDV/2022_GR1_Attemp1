import React from "react";
import NotFound from "../../../img/NotFound.png";
import "./notfound.scss";
const NotFoundPage = () => {
  return (
    <div className="not-found-page-wrapper">
      <div className="hidden md:flex not-found-page">
        <img className="not-found-image max-h-[300px] md:max-h-[500px]" alt="Error not found" src={NotFound} />
        <div className="not-found-text">
          Click <a className="home-page-link" href="/">here</a> to retun to home page
        </div>
      </div>
    </div>
    
  );
};

export default NotFoundPage;
