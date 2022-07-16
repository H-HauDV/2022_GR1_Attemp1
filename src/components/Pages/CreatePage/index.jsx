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
import { Select, Button, Modal } from "antd";
import { storage } from "../../../firebase.config";
import { saveItem } from "../../../utils/firebaseFunctions";
import { useStateValue } from "../../../context/StateProvider";
import { getAllFoodItems } from "../../../utils/firebaseFunctions";
import { actionType } from "../../../context/reducer";
import "./createpage.scss";
const { Option } = Select;

const CreatePage = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");

  const [categories, setCategories] = useState([]);
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
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setPrice("");
    setCalories("");
    setCategories([]);
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  const categoryDataToSelect = [];
  categoryData.map((aCategory) => {
    categoryDataToSelect.push(
      <Option key={aCategory.name}>{aCategory.name}</Option>
    );
  });
  const handleCategoriesChange = (value) => {
    // console.log(`selected ${value}`);
    setCategories(value);
    console.log(categories);
  };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [modalTitle, setModalTitle] = useState("Title of the modal");
  const [isDataValid, setIsDataValid] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    if (
      !title ||
      !calories ||
      !imageAsset ||
      !price ||
      categories.length == 0
    ) {
      setModalTitle(
        <h1 style={{ color: "#e74c3c" }}>Please check required field</h1>
      );
      setModalText("Required fields cannot be empty");
      setIsDataValid(false);
    } else {
      setModalTitle("Do you want to save?");
      setModalText("Click ok to save to database, cancel to continue edit");
      setIsDataValid(true);
    }
  };
  const handleModalOk = () => {
    if (isDataValid) {
      try {
        const data = {
          title: title,
          imageURL: imageAsset,
          categories: categories,
          calories: Number(calories),
          price: Number(price),
          status: 1,
        };
        console.log(data);
        saveItem(data);
        setModalTitle(<h1 style={{ color: "#27ae60" }}>Success</h1>);
        setModalText("Data saved to database");
        clearData();
        setTimeout(() => {
          setModalVisible(false);
          setConfirmLoading(false);
        }, 4000);
      } catch (error) {
        console.log(error);
        setModalTitle(
          <h1 style={{ color: "#e74c3c" }}>
            Error while uploading ! Try again
          </h1>
        );
        setModalText(error);
        setTimeout(() => {
          setModalVisible(false);
          setConfirmLoading(false);
        }, 4000);
      }
      setModalText("This modal will be closed after two seconds");
      setConfirmLoading(true);
      setTimeout(() => {
        setModalVisible(false);
        setConfirmLoading(false);
      }, 2000);
      fetchData();
    } else {
      setModalVisible(false);
    }
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <div className="create-container">
      <div className={`md:w-[75%] create-wrapper ${
              isDataValid === true
                ? "border-emerald-400"
                : "border-[#e67e22]"
            }`}>
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
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select categories"
            onChange={handleCategoriesChange}
            value={categories}
            className="categories-selector"
          >
            {categoryDataToSelect}
          </Select>
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

        <div className="calo-price-wrapper md:flex-row flex-col">
          <div className="calo-wrapper">
            <MdFoodBank className="icon" />
            <input
              type="number"
              required
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="input"
            />
          </div>
          <div
            className="price-wrapper"
          >
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="number"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div className="save-button-wrapper">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto save-button"
            onClick={showModal}
          >
            Save
          </button>
        </div>
      </div>
      <Modal
        className="create-confirm-modal"
        centered
        title={modalTitle}
        visible={modalVisible}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default CreatePage;
