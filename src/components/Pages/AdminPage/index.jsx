import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getAllOrder } from "../../../utils/firebaseFunctions";
import Moment from "moment";
import "./adminpage.scss";
const AdminPage = () => {
  // Get all order from firebase
  const [allOrders, setAllOrders] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState("false");

  useEffect(() => {
    const fetchOrderData = async () => {
      await getAllOrder().then((rawDataFromFirebase) => {
        // console.log("raw");
        setAllOrders(rawDataFromFirebase);
        // console.log(allOrders);
        setIsDataLoaded("true");
      });
    };
    fetchOrderData();
  }, [isDataLoaded]);

  function calcTotalPriceForAnOrder(foodList) {
    let totalPrice = 0;
    // console.log("foodList")

    // console.log(foodList)
    foodList.map((foodItem)=>{
      console.log("fooditem")
      console.log(foodItem)
      totalPrice+=foodItem.price
    })
    return totalPrice;
  }
  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };

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
      totalPrice: calcTotalPriceForAnOrder(anOrder.itemList),
      itemList: anOrder.itemList,
    });
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
      dataIndex: "price",
      key: "price",
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
        <Table className="parent-table"
          expandable={{
            expandedRowRender: (record) => (
              <Table className="child-table"
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
