import React from "react";
import CartContainer from "../CartContainer";
import HomeContainer from "../HomeContainer"
import MenuContainer from "../MenuContainer";
const MainContainer = () => {
  return (
    <div classname="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer/>

      <MenuContainer/>
      <CartContainer/>
    </div>
  );
};

export default MainContainer;
