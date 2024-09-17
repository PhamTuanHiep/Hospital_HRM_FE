import { Anchor, Flex, Typography } from "antd";
import { Menu, Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { store } from "../redux/store";
import {
  HomeOutlined,
  UserSwitchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Header.scss";
// import { TaskPaths } from "../../features/tasks/constants/constant.path";
import { UserPaths } from "../../features/users/constants/constant.path";
// import { useDispatch } from "react-redux";
// import { doLogout } from "../redux/action/userAction";
const Header = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <NavLink to="/" className="nav-link">
          Trang chủ
        </NavLink>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: (
        <NavLink to="/" className="nav-link">
          Giới thiệu
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink to="/" className="nav-link">
          Tin tức và sự kiện
        </NavLink>
      ),
    },
    {
      key: "4",
      label: (
        <NavLink to={UserPaths.LIST_USERS} className="nav-link">
          Liên hệ
        </NavLink>
      ),
    },
  ];

  // var isAuthenticated = store.getState().user.isAuthenticated;
  // const dispatch = useDispatch();
  // const handleNav = (e) => {
  //   console.log("click ", e);
  //   sessionStorage.setItem("currentNav", e.key);

  //   // setCurrent(e.key);
  // };
  const handleLogin = () => {
    navigate("/login");
  };
  // const handleLogup = () => {
  //   dispatch(doLogout());
  //   sessionStorage.clear();
  //   navigate("/logup");
  // };
  // const handleLogOut = () => {
  //   dispatch(doLogout());
  // };
  const items2 = [
    {
      label: (
        <NavLink to="/info-user" className="nav-link">
          User Information
        </NavLink>
      ),
      key: "0",
    },
    {
      label: (
        <NavLink
          to="/logup"
          className="nav-link"
          // onClick={handleLogup}
        >
          Register
        </NavLink>
      ),
      key: "1",
    },
    {
      label: (
        <NavLink
          to="/login"
          // onClick={handleLogOut}
        >
          Logout
        </NavLink>
      ),

      key: "3",
    },
  ];

  return (
    <div className="header">
      <Flex vertical>
        <Flex
          vertical={false}
          align="center"
          justify="space-between"
          id="header-info"
        >
          <Typography> 0123456789</Typography>
          <Typography> 128 Pham Hung, Tuw Liem, Ha Noi</Typography>
          <Typography>8h-11h</Typography>
        </Flex>
        <Flex vertical={false} justify="space-around" id="header-nav">
          <Menu className="nav" mode="horizontal" items={items} />
          {/* <div className="nav nav-setting">
            <Dropdown
              menu={{
                items: items2,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserSwitchOutlined />
                  Account
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div> */}
          <Button>Login</Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
