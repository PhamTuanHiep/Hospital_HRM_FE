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
import { ContactPaths } from "../../features/contact/constants/constant.path";
import { RecruitmentPaths } from "../../features/recruitment/constants/constant.path";
import { IntroPaths } from "../../features/introduction/constants/constant.path";
import { NewsAndEventsPaths } from "../../features/newsAndEvents/constants/constant.path";
// import { useDispatch } from "react-redux";
// import { doLogout } from "../redux/action/userAction";
const HeaderComponent = () => {
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
        <NavLink to="#" className="nav-link">
          Giới thiệu
        </NavLink>
      ),
      children: [
        {
          key: "2-sub-1",
          label: (
            <NavLink to={IntroPaths.VISION} className="nav-link">
              Tầm nhìn - sứ mệnh
            </NavLink>
          ),
        },
        {
          key: "2-sub-2",
          label: (
            <NavLink to={IntroPaths.ORGANIZATION} className="nav-link">
              Cơ cấu tổ chức
            </NavLink>
          ),
        },
        {
          key: "2-sub-3",
          label: (
            <NavLink to={IntroPaths.MANAGEMENT} className="nav-link">
              Ban lãnh đạo bệnh viện
            </NavLink>
          ),
        },
        {
          key: "2-sub-4",
          label: (
            <NavLink to={IntroPaths.DEPARTMENT} className="nav-link">
              Đơn vị - khoa phòng
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "3",
      label: (
        <NavLink to="/" className="nav-link">
          Tin tức và sự kiện
        </NavLink>
      ),

      children: [
        {
          key: "3-sub-1",
          label: (
            <NavLink to={NewsAndEventsPaths.NEWS} className="nav-link">
              Tin tức bệnh viện
            </NavLink>
          ),
        },
        {
          key: "3-sub-2",
          label: (
            <NavLink to={NewsAndEventsPaths.RESEARCH} className="nav-link">
              Nghiên cứu
            </NavLink>
          ),
        },
        {
          key: "3-sub-3",
          label: (
            <NavLink to={NewsAndEventsPaths.NUTRITION} className="nav-link">
              Góc dinh dưỡng
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "4",
      label: (
        <NavLink to={ContactPaths.CONTACT} className="nav-link">
          Liên hệ
        </NavLink>
      ),
    },
    {
      key: "5",
      label: (
        <NavLink to={"#"} className="nav-link">
          Tuyển dụng
        </NavLink>
      ),
      children: [
        {
          key: "5-sub-1",
          label: (
            <NavLink to={RecruitmentPaths.RECRUITMENT} className="nav-link">
              Tuyển dụng
            </NavLink>
          ),
        },
        {
          key: "5-sub-2",
          label: (
            <NavLink to={RecruitmentPaths.TRAIN} className="nav-link">
              Đào tạo
            </NavLink>
          ),
        },
      ],
    },
  ];

  return (
    <div id="header">
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
          <Menu
            className="nav"
            mode="horizontal"
            items={items}
            defaultSelectedKeys={["1"]}
          />

          <Button type="primary">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default HeaderComponent;
