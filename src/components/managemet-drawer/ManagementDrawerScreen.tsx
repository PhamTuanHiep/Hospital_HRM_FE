import { Drawer, Flex, List } from "antd";
import { useAppSelector } from "../../app/hooks";
import "./ManagementDrawerScreen.scss";
import {
  AccountBookOutlined,
  ApartmentOutlined,
  BellOutlined,
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
import { FeatureName, RoleId } from "./type";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../features/auth/constants/accountSlice";
import { UserPaths } from "../../features/users/constants/constant.path";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ManagerPaths } from "../../features/manager/constants/constant.path";

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
      icon: <UserOutlined />,
      text: t("content.feature.AccountInfo"),
      path: UserPaths.ACCOUNT_INFO,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <AccountBookOutlined />,
      text: "Quản lý tài khoản",
      path: ManagerPaths.ACCOUNT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <UsergroupAddOutlined />,
      text: "Quản lý nhân viên",
      path: ManagerPaths.EMPLOYEE_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileOutlined />,
      text: "Quản lý hồ sơ",
      path: ManagerPaths.PROFILE_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileTextOutlined />,
      text: "Quản lý hợp đồng",
      path: ManagerPaths.CONTRACT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <ApartmentOutlined />,
      text: "Quản lý phòng ban",
      path: ManagerPaths.DEPARTMENT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Quản lý công việc ",
      path: ManagerPaths.JOB_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      text: "Quản lý phúc lợi",
      path: ManagerPaths.BENEFITS_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileSearchOutlined />,
      text: "Quản lý tuyển dụng",
      path: ManagerPaths.RECRUITMENT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <SnippetsOutlined />,
      text: "Đào tạo",
      path: ManagerPaths.TRAINING,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <LogoutOutlined />,
      text: "Đăng xuất",
      fn: (e: any) => {
        dispatch(doLogout(currentAccount));
        setOpen(false);
        navigate("/");
      },
    },
  ];

  const userFeature: FeatureName[] = [
    {
      icon: <UserOutlined />,
      text: t("content.feature.AccountInfo"),
      path: UserPaths.ACCOUNT_INFO,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileOutlined />,
      text: t("content.feature.Record"),
      path: UserPaths.RECORD,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileTextOutlined />,
      text: t("content.feature.Contract"),
      path: UserPaths.CONTRACT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      text: t("content.feature.Benefits"),
      path: UserPaths.BENEFITS,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: t("content.feature.WorkSchedule"),
      path: UserPaths.SCHEDULE,

      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <BellOutlined />,
      path: UserPaths.NOTIFICATION,
      text: t("content.feature.Notification"),
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileDoneOutlined />,
      path: UserPaths.TRAINING_RESULTS,
      text: t("content.feature.TrainingResults"),
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <ProfileOutlined />,
      path: UserPaths.WORK_PERFORMANCE_SCREEN,
      text: t("content.feature.WorkPerformance"),
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <LogoutOutlined />,
      text: t("homepage.Logout"),
      fn: (e: any) => {
        dispatch(doLogout(currentAccount));
        setOpen(false);
        navigate("/");
      },
    },
  ];

  type User = {
    name: string;
    age: number;
    getDetails: () => string;
  };

  const featureNames =
    currentAccount?.roleId === RoleId.ADMIN ? adminFeature : userFeature;
  const featureList = featureNames.map((featureName) => (
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
            <img
              className="avatar"
              src="https://media.istockphoto.com/id/474486193/photo/close-up-of-a-golden-retriever-panting-11-years-old-isolated.jpg?s=612x612&w=0&k=20&c=o6clwQS-h6c90AHlpDPC74vAgtc_y2vvGg6pnb7oCNE="
            ></img>
          </div>
        }
      >
        <List
          dataSource={featureList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Drawer>
    </>
  );
};
export default ManagementDrawerScreen;
