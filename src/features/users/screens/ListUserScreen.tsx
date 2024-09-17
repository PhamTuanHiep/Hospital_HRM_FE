import React, { useEffect, useState } from "react";
import { Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
// import instance from '../../../apis/apis';
import { UserApis } from "../constants/constant.endpoint";
import "./ListUserScreen.scss";

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
}

const columns: TableProps<User>["columns"] = [
  {
    title: "Name",
    dataIndex: "username",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

const ListUserScreen = () => {
  const { Search } = Input;
  const [data, setData] = useState<User[]>([
    {
      id: "",
      username: "",
      email: "",
      phone: "",
    },
  ]);
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    phone: "",
  });
  // useEffect(()=>{
  //     getUsers()
  // },[])

  // const getUsers = async () => {
  //     console.log("getUser")
  //     const response = await instance.get(`${UserApis.USERS}`, {});
  //     const data=response.data
  //     const user= response.data[0]
  //     setData(data)
  //     setUser(user)
  //     // console.log("response:",response);
  //     console.log("data:",data);
  //     console.log("user:",user);
  //   };
  return (
    <div id="form_container">
      <div className="title">
        <span className="title-item">Tra cứu tên user</span>
        <Search
          className="title-item"
          placeholder="input search text"
          enterButton="Search"
          size="large"
        />
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ListUserScreen;
