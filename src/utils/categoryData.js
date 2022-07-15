import { GiChickenOven, GiMeat, GiNoodles } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import { BiDrink } from "react-icons/bi";


export const categoryData = [
  {
    id: 1,
    name: "Chicken",
    urlParam: "chicken",
    icon: <GiChickenOven />,
  },
  {
    id: 2,
    name: "Fish",
    urlParam: "fish",
    icon: <IoFish/>,
  },
  {
    id: 3,
    name: "Pork",
    urlParam: "pork",
    icon: <GiMeat/>,

  },
  {
    id: 4,
    name: "Noodles",
    urlParam: "noodles",
    icon: <GiNoodles/>,
  },
  {
    id: 5,
    name: "Drink",
    urlParam: "drink",
    icon: <BiDrink/>,

  },
];
export default categoryData;
