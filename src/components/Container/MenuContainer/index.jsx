import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { categoryData } from "../../../utils/categoryData";
import { motion } from "framer-motion";
import { useStateValue } from "../../../context/StateProvider";
import RowContainer from "../RowContainer";
import "./menucontainer.scss";

import Item from "antd/lib/list/Item";
const MenuContainer = () => {
  const [categoryFilter, setCategoryFilter] = useState("chicken");
  const [searchText, setSearchText] = useState("");

  const [{ foodItems }, dispatch] = useStateValue();
  const [displayFood, setDisplayFood] = useState([]);

  const onSearchInput = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const categoryFilterOnCLick = (event, param) => {
    setDisplayFood([]);
    console.log(param);
    setCategoryFilter(param);
  };
  useEffect(() => {
    const refinedSearch = () => {
      if (!foodItems) {
      } else {
        foodItems.map((aFoodItems) => {
          if (aFoodItems.categories.includes(categoryFilter)) {
            setDisplayFood((displayFood) => [...displayFood, aFoodItems]);
          }
          const withoutDuplicates = [...new Set(displayFood)];
          setDisplayFood(withoutDuplicates);
        });
        console.log(displayFood);
      }
    };
    refinedSearch();
  }, [searchText, categoryFilter]);
  return (
    <section className="w-full my-6" id="menu">
      <div className="menu-container">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categoryData &&
            categoryData.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.urlParam}
                className={`group ${
                  categoryFilter === category.urlParam
                    ? "bg-cartNumBg"
                    : "bg-white"
                } w-24 min-w-[94px] h-28
          cursor-pointer rounded-lg drop-shadow-lg flex flex-col
          gap-3 items-center justify-center hover:bg-cartNumBg`}
                // onClick={() => setFilter(category.urlParam)}
                onClick={(event) =>
                  categoryFilterOnCLick(event, category.urlParam)
                }
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    categoryFilter === category.urlParam
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } 
            group-hover:bg-white flex items-center justify-center`}
                >
                  <div
                    className={` ${
                      categoryFilter === category.urlParam
                        ? "text-textColor"
                        : "text-white"
                    }  group-hover:text-black text-lg`}
                  >
                    {category.icon}
                  </div>
                </div>
                <p
                  className={`text-sm ${
                    categoryFilter === category.urlParam
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="search-wrapper">
          <div className="search-bar">
            <input
              className="search-input"
              value={searchText}
              type="text"
              placeholder="Search"
              onChange={onSearchInput}
            />
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <BiSearchAlt size={30} className="search-icon" />
            </motion.div>
          </div>
        </div>
        <div className="w-full">
          <RowContainer flag={false} data={displayFood} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
