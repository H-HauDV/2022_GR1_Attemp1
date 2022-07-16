import { GiChickenOven, GiMeat, GiNoodles } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import { BiDrink } from "react-icons/bi";


export const categoryData = [
  {
    id: 1,
    name: "Chicken",
    urlParam: "Chicken",
    icon: <GiChickenOven />,
  },
  {
    id: 2,
    name: "Fish",
    urlParam: "Fish",
    icon: <IoFish/>,
  },
  {
    id: 3,
    name: "Pork",
    urlParam: "Pork",
    icon: <GiMeat/>,

  },
  {
    id: 4,
    name: "Noodles",
    urlParam: "Noodles",
    icon: <GiNoodles/>,
  },
  {
    id: 5,
    name: "Drink",
    urlParam: "Drink",
    icon: <BiDrink/>,

  },
];
export default categoryData;
