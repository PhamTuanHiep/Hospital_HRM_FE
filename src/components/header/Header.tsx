import { Avatar, Flex, Typography } from "antd";
import { Menu, Button } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.scss";

import { ContactPaths } from "../../features/contact/constants/constant.path";
import { RecruitmentPaths } from "../../features/recruitment/constants/constant.path";
import { IntroPaths } from "../../features/introduction/constants/constant.path";
import { NewsAndEventsPaths } from "../../features/newsAndEvents/constants/constant.path";
import { useAppSelector } from "../../app/hooks";
import ManagementDrawerScreen from "../managemet-drawer/ManagementDrawerScreen";
import { useTranslation } from "react-i18next";
import Language from "./Language";

const HeaderComponent = () => {
  // const navigate = useNavigate();
  const { account: currentAccount, isAuthen } = useAppSelector(
    (state) => state.account_user
  );

  const { t } = useTranslation();

  const items = [
    {
      key: "1",
      label: (
        <NavLink to="/" className="nav-link">
          {t("homepage.Homepage")}
        </NavLink>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: (
        <NavLink to="#" className="nav-link">
          {t("homepage.Intro")}
        </NavLink>
      ),
      children: [
        {
          key: "2-sub-1",
          label: (
            <NavLink to={IntroPaths.VISION} className="nav-link">
              {t("homepage.Vision")}
            </NavLink>
          ),
        },
        {
          key: "2-sub-2",
          label: (
            <NavLink to={IntroPaths.ORGANIZATION} className="nav-link">
              {t("homepage.Origanization")}
            </NavLink>
          ),
        },
        {
          key: "2-sub-3",
          label: (
            <NavLink to={IntroPaths.BOARDOFDIRECTORS} className="nav-link">
              {t("homepage.BoardOfDirectors")}
            </NavLink>
          ),
        },
        {
          key: "2-sub-4",
          label: (
            <NavLink to={IntroPaths.DEPARTMENT} className="nav-link">
              {t("homepage.Department")}
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "3",
      label: (
        <NavLink to="/" className="nav-link">
          {t("homepage.NewsAndEvents")}
        </NavLink>
      ),

      children: [
        {
          key: "3-sub-1",
          label: (
            <NavLink to={NewsAndEventsPaths.NEWS} className="nav-link">
              {t("homepage.News")}
            </NavLink>
          ),
        },
        {
          key: "3-sub-2",
          label: (
            <NavLink to={NewsAndEventsPaths.RESEARCH} className="nav-link">
              {t("homepage.Reserch")}
            </NavLink>
          ),
        },
        {
          key: "3-sub-3",
          label: (
            <NavLink to={NewsAndEventsPaths.NUTRITION} className="nav-link">
              {t("homepage.Nutrition")}
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "4",
      label: (
        <NavLink to={ContactPaths.CONTACT} className="nav-link">
          {t("homepage.Contact")}
        </NavLink>
      ),
    },
    {
      key: "5",
      label: (
        <NavLink to={"#"} className="nav-link">
          {t("homepage.Recruitment")}
        </NavLink>
      ),
      children: [
        {
          key: "5-sub-1",
          label: (
            <NavLink to={RecruitmentPaths.RECRUITMENT} className="nav-link">
              {t("homepage.Recruitment")}
            </NavLink>
          ),
        },
        {
          key: "5-sub-2",
          label: (
            <NavLink to={RecruitmentPaths.TRAIN} className="nav-link">
              {t("homepage.Train")}
            </NavLink>
          ),
        },
      ],
    },
  ];

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div id="header">
      <Flex vertical>
        <Flex
          vertical={false}
          align="center"
          justify="space-between"
          id="header-info"
        >
          <Typography>Liên hệ: 0123456789</Typography>
          <Typography>Số 8 đường Phạm Hùng, Cầu Giấy, Hà Nội</Typography>
          <Typography>Sáng (07:00 - 12:00) - Chiều (13:30 - 17:30)</Typography>
        </Flex>
        <Flex vertical={false} justify="space-around" id="header-nav">
          <Menu
            className="nav"
            mode="horizontal"
            items={items}
            defaultSelectedKeys={["1"]}
          />
          <div className="right-header">
            <Language />

            {!isAuthen ? (
              <Button type="primary">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </Button>
            ) : (
              <div className="avatar-box" onClick={showDrawer}>
                <Avatar
                  size="large"
                  src={currentAccount.avatar}
                  icon={<UserOutlined style={{ fontSize: "80%" }} />}
                  shape="circle"
                  className="avatar"
                />
              </div>
            )}
          </div>
        </Flex>
      </Flex>
      <ManagementDrawerScreen open={open} setOpen={setOpen} />
    </div>
  );
};

export default HeaderComponent;
