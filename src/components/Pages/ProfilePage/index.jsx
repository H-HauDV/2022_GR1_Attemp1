import React, { useEffect } from "react";
import "./profilepage.scss";
import { Form, Input } from "antd";
import { useStateValue } from "../../../context/StateProvider";
const ProfilePage = () => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {

  }, []);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <div className="info-wrapper">
        <div className="info-container">
          <div className="left">
            <img
              className="avatar md:min-w-[180px] min-w-[150px]"
              src={user.photoURL}
              alt="avatar"
            />
          </div>
          <div className="right md:min-w-[600px] min-w-[400px]">
            <div className="title">Thông tin người dùng</div>
            <Form
              className="info-form md:min-w-[480px] min-w-[350px]"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              layout="horizontal"
              size={"large"}
            >
              <Form.Item label="Địa chỉ email">
                <Input disabled value={user.email} />
              </Form.Item>
              <Form.Item label="Tên hiển thị">
                <Input disabled value={user.displayName} />
              </Form.Item>
              <Form.Item label="Địa chỉ">
                <Input value={""} />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input value={user.phoneNumber} />
              </Form.Item>
            </Form>
            <div className="button-wrapper">
              <button className="submit">Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
