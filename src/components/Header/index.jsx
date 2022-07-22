import React, { useState } from "react";

import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { app } from "../../firebase.config";

import { MdShoppingBasket, MdLogout, MdAdd } from "react-icons/md";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import Logo from "../../img/logo.png";
import { motion } from "framer-motion";
import { Button, Modal, Checkbox, Form, Input, Row, Tooltip } from "antd";
import "./header.scss";
const Header = () => {
  const Avatar = "https://joeschmoe.io/api/v1/random";
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
      setloginModalVisible(!loginModalVisible);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const [loginModalVisible, setloginModalVisible] = useState(false);
  const [loginConfirmLoading, setLoginConfirmLoading] = useState(false);
  const showLoginModal = () => {
    if (user) {
      setIsMenu(!isMenu);
    } else {
      setloginModalVisible(true);
    }
  };
  const handleLoginCancel = () => {
    console.log("Clicked cancel button");
    setloginModalVisible(false);
  };

  const handleLoginOk = () => {
    setLoginConfirmLoading(true);
    setTimeout(() => {
      setloginModalVisible(false);
      setLoginConfirmLoading(false);
    }, 2000);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <header className="header-wrapper p-3 px-4 md:p-6 md:px-16">
      {/* desktop & tablet */}
      <div className="desktop-screen hidden md:flex">
        <Link to={"/"} className="home-icon">
          <img src={Logo} className="image" alt="logo" />
          <p className="text"> City</p>
        </Link>

        <div className="list-wrapper">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="first-list"
          >
            <li className="first-list-item">Home</li>
            <li className="first-list-item">Menu</li>
            <li className="first-list-item">About Us</li>
            <li className="first-list-item">Service</li>
          </motion.ul>

          <div className="cart-icon" onClick={showCart}>
            <MdShoppingBasket className="icon" />
            {cartItems && cartItems.length > 0 && (
              <div className="number-wrapper">
                <p className="number">{cartItems.length}</p>
              </div>
            )}
          </div>

          <div className="user-icon">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="user-image"
              alt="userprofile"
              onClick={showLoginModal}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="user-menu"
              >
                {user && user.role === "admin" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      <MdAdd /> New Item
                    </p>
                  </Link>
                )}
                <Link className="link-item-wrapper" to={"/profile"}>
                  <p className="link-item" onClick={() => setIsMenu(false)}>
                    <CgProfile className="link-icon" /> Profile
                  </p>
                </Link>
                <p className="nor-item-wrapper" onClick={logout}>
                  <MdLogout /> Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="mobile-wrapper md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div className="mobile-screen ">
          <div className="cart-icon" onClick={showCart}>
            <MdShoppingBasket className="icon" />
            {cartItems && cartItems.length > 0 && (
              <div className="number-wrapper">
                <p className="number">{cartItems.length}</p>
              </div>
            )}
          </div>

          <Link to={"/"} className="home-icon">
            <img src={Logo} className="image" alt="logo" />
            <p className="text"> City</p>
          </Link>

          <div className="user-menu">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="image"
              alt="userprofile"
              onClick={showLoginModal}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="menu-list"
              >
                {user && user.role === "admin" && (
                  <Link className="link-wrapper" to={"/createItem"}>
                    <p className="link-inner">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <ul className="second-menu">
                  <li className="menu-item" onClick={() => setIsMenu(false)}>
                    Home
                  </li>
                  <li className="menu-item" onClick={() => setIsMenu(false)}>
                    Menu
                  </li>
                  <li className="menu-item" onClick={() => setIsMenu(false)}>
                    About Us
                  </li>
                  <li className="menu-item" onClick={() => setIsMenu(false)}>
                    Service
                  </li>
                </ul>

                <p className="mobile-logout" onClick={logout}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Login modal */}
      <div className="">
        <Modal
          className="food-login-wrapper"
          title="Login"
          centered
          visible={loginModalVisible}
          onOk={handleLoginOk}
          confirmLoading={loginConfirmLoading}
          onCancel={handleLoginCancel}
        >
          <Form
            name="basic"
            wrapperCol={{
              span: 32,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Tooltip title="Enter your username">
                <Input className="login-input" placeholder="Username" />
              </Tooltip>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Tooltip title="Enter password">
                <Input.Password
                  className="login-input"
                  placeholder="Password"
                />
              </Tooltip>
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 0,
                span: 8,
              }}
            >
              <Tooltip title="Remember for next time">
                <Checkbox>Remember me</Checkbox>
              </Tooltip>
            </Form.Item>

            <Form.Item className="login-submit-row">
              <Button
                className="login-submit"
                type="primary"
                htmlType="submit"
                onClick={onFinish}
              >
                Login
              </Button>
              <p className="login-help-row">
                <a className="login-help">Forgot your password ?</a>
                <a className="login-help">Sign Up</a>
              </p>
            </Form.Item>
            <Row className="login-other">
              <Button className="social-login-button mr-10" onClick={login}>
                <Tooltip title="Login with google">
                  <FaGoogle className="social-login-icon" />
                </Tooltip>
              </Button>
              <Button className="social-login-button mr-10">
                <Tooltip title="Login with Facebook">
                  <FaFacebookF className="social-login-icon" />
                </Tooltip>
              </Button>
              <Button className="social-login-button">
                <Tooltip title="Login with twitter">
                  <FaTwitter className="social-login-icon" />
                </Tooltip>
              </Button>
            </Row>
          </Form>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
