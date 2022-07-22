import React, { useEffect } from "react";
import {
  Header,
  CreatePage,
  MainPage,
  ProfilePage,
  AdminPage,
  NotFoundPage,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import "antd/dist/antd.min.css";
const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header className="" />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full ">
          <Routes>
            {/* Not found */}
            <Route exact path="*" element={<NotFoundPage />} />
            <Route exact path="/" element={<MainPage />} />

            <Route path="/create" element={<CreatePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
