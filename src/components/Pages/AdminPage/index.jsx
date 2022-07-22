import React, { useEffect, useState } from "react";
import { Table, Tag, Popconfirm, message } from "antd";
import {
  CheckOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getAllOrder } from "../../../utils/firebaseFunctions";
import { updateOrderStatus } from "../../../utils/firebaseFunctions";
import "./adminpage.scss";
const AdminPage = () => {
  // Get all order from firebase
  const [allOrders, setAllOrders] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState("false");
  const handleCancelOrder = (key) => {
    var data = { id: key, status: -1 };

    updateOrderStatus(data);
    fetchOrderData();
    message.success("Cancel order successfully");
  };
  const handleDeliverOrder = (key) => {
    var data = { id: key, status: 1 };

    updateOrderStatus(data);
    fetchOrderData();
    message.success("Confirm order delivery successfully");
  };
  const fetchOrderData = async () => {
    await getAllOrder().then((rawDataFromFirebase) => {
      // console.log("raw");
      setAllOrders(rawDataFromFirebase);
      // console.log(allOrders);
      setIsDataLoaded("true");
    });
  };
  useEffect(() => {
    fetchOrderData();
  }, [isDataLoaded]);

  function calcTotalPriceForAnOrder(foodList) {
    let itemTotalPrice = 0;
    // console.log("foodList")

    // console.log(foodList)
    foodList.map((foodItem) => {
      // console.log("fooditem");
      // console.log(foodItem);
      itemTotalPrice += foodItem.price * foodItem.qty;
      return 0;
    });
    let itemTotalPriceRound=Math.round(itemTotalPrice * 100) / 100
    return itemTotalPriceRound.toString() +"+2.5="+(itemTotalPriceRound+2.5).toString();
  }
  const ordersDataToTable = [];
  allOrders.map((anOrder) => {
    ordersDataToTable.push({
      key: anOrder.id,
      date: Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(anOrder.date.seconds * 1000),
      email: anOrder.userInfo.email,
      totprice: calcTotalPriceForAnOrder(anOrder.itemList),
      itemList: anOrder.itemList,
      status: anOrder.status,
    });
    return 0;
  });

  const columnsForAllOrders = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "From(email)",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Price",
      dataIndex: "totprice",
      key: "totprice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <div className="tag-container">
          {status === 0 ? <Tag color={"#e67e22"}>Chưa được xử lý</Tag> : null}
          {status === 1 ? <Tag color={"#2ecc71"}>Đã giao hàng</Tag> : null}
          {status === -1 ? <Tag color={"#e74c3c"}>Đã hủy</Tag> : null}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="action-col">
          <Popconfirm
            title="Are you sure want to cancel this order?"
            icon={
              <QuestionCircleOutlined
                style={{ fontSize: "16px", color: "red" }}
              />
            }
            okText="Cancel order"
            cancelText="Don't cancel order"
            onConfirm={() => {
              handleCancelOrder(record.key);
            }}
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined className="cancel-icon" style={{ color: "#ff0000" }} />
          </Popconfirm>
          <Popconfirm
            title="Confirm that this order delivered?"
            icon={
              <QuestionCircleOutlined
                style={{ fontSize: "16px", color: "#27ae60" }}
              />
            }
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeliverOrder(record.key);
            }}
            okButtonProps={{ danger: false }}
          >
            <CheckOutlined className="deliver-icon" style={{ color: "#27ae60" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const columnsForFoodList = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
  ];
  return (
    <div className="admin-wrapper">
      <div className="title">Order list</div>
      <div className="orders-table">
        <Table
          className="parent-table"
          expandable={{
            expandedRowRender: (record) => (
              <Table
                className="child-table"
                pagination={false}
                dataSource={record.itemList}
                columns={columnsForFoodList}
              />
            ),
            // expandedRowRender: (record) => {
            //   console.log("record ", record);
            //   return record.children ? true : false;
            // },
          }}
          loading={!isDataLoaded}
          dataSource={ordersDataToTable}
          columns={columnsForAllOrders}
        />
        ;
      </div>
    </div>
  );
};

export default AdminPage;
