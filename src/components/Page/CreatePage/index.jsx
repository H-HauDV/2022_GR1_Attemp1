import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import categoryData from "../../../utils/categoryData";
import CreateLoader from "../../Loader/CreateLoader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../firebase.config";
import { saveItem } from "../../../utils/firebaseFunctions";
import { useStateValue } from "../../../context/StateProvider";
import { getAllFoodItems } from "../../../utils/firebaseFunctions";
import { actionType } from "../../../context/reducer";
import "./createpage.scss";
const CreatePage = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);

  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading ! Try again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setFields(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setIsLoading(false);
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields cannot be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          price: price,
          qty: 1,
        };
        console.log(data)
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data added successfully");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading ! Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setPrice("");
    setCalories("");
    setCategory("Select Category");
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  return (
    <div className="create-container">
      <div className=" md:w-[75%] create-wrapper">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`noftify ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="food-name">
          <MdFastfood className="food-icon" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="food-name-input"
          />
        </div>

        <div className="food-category-wrapper">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="food-category"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categoryData &&
              categoryData.map((category) => (
                <option
                  key={category.id}
                  className="category-option"
                  value={category.urlParam}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="image-upload-wrapper h-225 md:h-420">
          {isLoading ? (
            <CreateLoader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="">
                    <div className="upload-hint-wrapper">
                      <MdCloudUpload className="upload-hint-label" />
                      <p className="upload-hint-text">Click here to upload</p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="upload-image-input"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="image-wrapper">
                    <img src={imageAsset} alt="Uploaded" className="" />
                    <button
                      type="button"
                      className="delete-button"
                      onClick={deleteImage}
                    >
                      <MdDelete className="delete-icon" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div
            className="w-full py-2 border-b border-gray-300 flex items-center
          gap-2"
          >
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none
            border-none placeholder:text-gray-400 text-textClolor"
            />
          </div>
          <div
            className="w-full py-2 border-b border-gray-300 flex items-center
          gap-2"
          >
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none
            border-none placeholder:text-gray-400 text-textClolor"
            />
          </div>
        </div>

        <div className="save-button-wrapper">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto save-button"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
