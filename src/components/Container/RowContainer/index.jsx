import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../../../img/NotFound.svg";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import "./rowcontainer.scss";
import { RowContainerLoader } from "../../index";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [{ cartItems }, dispatch] = useStateValue();

  const [items, setItems] = useState(cartItems);

  const addToStorage = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToStorage();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data == [] ? (
        <RowContainerLoader />
      ) : (
        <>
          {data && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item?.id}
                className="food-card md:w-300 md:min-w-[300px] hover:drop-shadow-lg"
              >
                <div className="food-card-top">
                  <motion.div
                    className="image-container"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img src={item?.imageURL} alt="" className="food-image" />
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="add-cart-button hover:shadow-md"
                    onClick={() => {
                      console.log(items);
                      console.log(cartItems);
                      if (!items.includes(item)) {
                        setItems([...cartItems, item]);
                      } else {
                        console.log("Item already in cart");
                      }
                    }}
                  >
                    <MdShoppingBasket className="text-white" />
                  </motion.div>
                </div>

                <div className="food-card-bottom">
                  <p className="food-title md:text-lg">{item?.title}</p>
                  <p className="food-calory">{item?.calories} Calories</p>
                  <div className="food-price-wrap">
                    <p className="food-price-container">
                      <span className="food-price-text">$</span> {item?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={NotFound} className="h-340" />
              <p className="text-xl text-headingColor font-semibold my-2">
                Items Not Available
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RowContainer;
