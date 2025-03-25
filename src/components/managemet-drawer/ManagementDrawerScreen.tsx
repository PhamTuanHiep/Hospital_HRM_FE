import { Avatar, Drawer, Flex, List, Typography } from "antd";
import { useAppSelector } from "../../app/hooks";
import "./ManagementDrawerScreen.scss";
import {
  AccountBookOutlined,
  ApartmentOutlined,
  // BellOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  InsertRowAboveOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { FeatureName } from "./type";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../features/auth/constants/accountSlice";
import { UserPaths } from "../../features/users/constants/constant.path";
import { useTranslation } from "react-i18next";
import { RoleId } from "../../common/common.constant";
import { managerPaths } from "../../features/manager/constants/constant.path";
import { useMemo } from "react";

const { Title } = Typography;
interface ManagementDrawerProps {
  open: boolean;
  setOpen: Function;
}

const ManagementDrawerScreen = ({ open, setOpen }: ManagementDrawerProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );

  const adminFeature: FeatureName[] = [
    {
      icon: <FileOutlined />,
      text: t("content.feature.ProfileManagement"),
      path: managerPaths.PROFILE_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <AccountBookOutlined />,
      text: t("content.feature.AccountManagement"),
      path: managerPaths.ACCOUNT_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <UsergroupAddOutlined />,
      text: t("content.feature.EmployeeManagement"),
      path: managerPaths.EMPLOYEE_WORK_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },

    {
      icon: <FileTextOutlined />,
      text: t("content.feature.ScheduleManagement"),
      path: managerPaths.SCHEDULE_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <FileTextOutlined />,
      text: t("content.feature.ContractManagement"),
      path: managerPaths.CONTRACT_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <ApartmentOutlined />,
      text: t("content.feature.DepartmentManagement"),
      path: managerPaths.DEPARTMENT_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: t("content.feature.PositionManagement"),
      path: managerPaths.POSITION_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      text: t("content.feature.SalaryManagement"),
      path: managerPaths.SALARY_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <FileSearchOutlined />,
      text: t("content.feature.RecruitmentManagement"),
      path: managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <SnippetsOutlined />,
      text: t("content.feature.AnnouncementManagement"),
      path: managerPaths.ANNOUNCEMENT_MANAGEMENT,
      fn: () => {
        setOpen(false);
      },
    },
  ];

  const userFeature: FeatureName[] = [
    {
      icon: <UserOutlined />,
      text: t("content.feature.PersonalProfile"),
      path: UserPaths.RECORD,
      fn: () => {
        setOpen(false);
      },
    },
    // {
    //   icon: <FileTextOutlined />,
    //   text: t("content.feature.Contract"),
    //   path: UserPaths.CONTRACT,
    //   fn: () => {
    //     setOpen(false);
    //   },
    // },
    // {
    //   icon: <MoneyCollectOutlined />,
    //   text: t("content.feature.Benefits"),
    //   path: UserPaths.BENEFITS,
    //   fn: () => {
    //     setOpen(false);
    //   },
    // },
    {
      icon: <InsertRowAboveOutlined />,
      text: t("content.feature.WorkSchedule"),
      path: UserPaths.SCHEDULE,

      fn: () => {
        setOpen(false);
      },
    },
    // {
    //   icon: <BellOutlined />,
    //   path: UserPaths.NOTIFICATION,
    //   text: t("content.feature.Notification"),
    //   fn: () => {
    //     setOpen(false);
    //   },
    // },
    {
      icon: <FileDoneOutlined />,
      path: UserPaths.TRAINING_RESULTS,
      text: t("content.feature.TrainingResults"),
      fn: () => {
        setOpen(false);
      },
    },
    {
      icon: <ProfileOutlined />,
      path: UserPaths.WORK_PERFORMANCE_SCREEN,
      text: t("content.feature.WorkPerformance"),
      fn: () => {
        setOpen(false);
      },
    },
  ];

  const logoutFeature: FeatureName[] = [
    {
      icon: <LogoutOutlined />,
      text: t("homepage.Logout"),
      fn: () => {
        dispatch(doLogout(currentAccount));
        setOpen(false);
        navigate("/");
      },
    },
  ];
  const isUser = useMemo(
    () => currentAccount?.role?.roleId === RoleId.USER,
    [currentAccount]
  );

  const userFeatureList = userFeature.map((featureName) => (
    <NavLink to={featureName.path || "#"}>
      <Flex onClick={(e) => featureName.fn(e)}>
        <div className="item-icon">{featureName.icon}</div>
        <div className="item-content">{featureName.text}</div>
      </Flex>
    </NavLink>
  ));

  const adminFeatureList = adminFeature.map((featureName) => (
    <NavLink to={featureName.path || "#"}>
      <Flex onClick={(e) => featureName.fn(e)}>
        <div className="item-icon">{featureName.icon}</div>
        <div className="item-content">{featureName.text}</div>
      </Flex>
    </NavLink>
  ));
  const logoutFeatureName = logoutFeature.map((featureName) => (
    <NavLink to={featureName.path || "#"}>
      <Flex onClick={(e) => featureName.fn(e)}>
        <div className="item-icon">{featureName.icon}</div>
        <div className="item-content">{featureName.text}</div>
      </Flex>
    </NavLink>
  ));

  return (
    <>
      <Drawer
        id="management-drawer"
        title="Pham Tuan Hiep"
        onClose={onClose}
        open={open}
        extra={
          <div className="avatar-box">
            <Avatar
              size="large"
              src={currentAccount.avatar}
              icon={<UserOutlined style={{ fontSize: "80%" }} />}
              shape="circle"
              className="avatar"
            />
          </div>
        }
      >
        {isUser ? (
          <Flex vertical>
            <Title level={5}>{t("content.feature.Personal")}</Title>
            <List
              dataSource={userFeatureList}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Flex>
        ) : (
          <Flex vertical>
            <Title level={5}>{t("content.feature.Personal")}</Title>
            <List
              dataSource={userFeatureList}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Title level={5}>{t("content.feature.Management")}</Title>
            <List
              dataSource={adminFeatureList}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Flex>
        )}
        <Flex vertical>
          <List
            className="logout"
            dataSource={logoutFeatureName}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Flex>
      </Drawer>
    </>
  );
};
export default ManagementDrawerScreen;
