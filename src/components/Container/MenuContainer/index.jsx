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
  const [categoryFilter, setCategoryFilter] = useState("Chicken");
  const [searchText, setSearchText] = useState("");

  const [{ foodItems }, dispatch] = useStateValue();
  const [displayFood, setDisplayFood] = useState([]);

  const onSearchInput = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const categoryFilterOnCLick = (event, param) => {
    setCategoryFilter(param);
  };
  const isItemsHaveCate = (value) => {
    if (value.categories.includes(categoryFilter)) {
      return 1;
    }
    return value > 1;
  };
  const isItemsHaveName = (value) => {
    console.log(searchText.toLowerCase())
    if (value.title.toLowerCase().includes(searchText.toLowerCase())) {
      return 1;
    }
    return value > 1;
  };
  useEffect(() => {
    console.log(foodItems);
    // foodItems?.filter((n) => n.category == categoryFilter)
  }, [searchText, categoryFilter, foodItems]);
  return (
    <section className="w-full my-6" id="menu">
      <div className="menu-container">
        <p className="title ">Our Hot Dishes</p>

        <div className="categories-wrapper justify-start lg:justify-center">
          {categoryData &&
            categoryData.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.urlParam}
                className={`group ${
                  categoryFilter === category.urlParam
                    ? "bg-cartNumBg"
                    : "bg-white"
                } cate-card `}
                // onClick={() => setFilter(category.urlParam)}
                onClick={(event) =>
                  categoryFilterOnCLick(event, category.urlParam)
                }
              >
                <div
                  className={`cate-card-wrapper ${
                    categoryFilter === category.urlParam
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white`}
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
          <RowContainer
            flag={false}
            data={!foodItems ? [] : foodItems.filter(isItemsHaveCate).filter(isItemsHaveName)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
