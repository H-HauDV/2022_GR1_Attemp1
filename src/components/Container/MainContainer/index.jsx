import React from "react";
import HomeContainer from "../HomeContainer"
import MenuContainer from "../MenuContainer";
const MainContainer = () => {
  return (
    <div classname="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer/>

      <MenuContainer/>
    </div>
  );
};

export default MainContainer;
