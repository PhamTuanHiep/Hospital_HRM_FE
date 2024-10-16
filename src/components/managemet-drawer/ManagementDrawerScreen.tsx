import { Avatar, Drawer, Flex, List } from "antd";
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
import { FeatureName } from "./type";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../features/auth/constants/accountSlice";
import { UserPaths } from "../../features/users/constants/constant.path";
import { useTranslation } from "react-i18next";
import { RoleId } from "../../common/common.constant";
import { managerPaths } from "../../features/manager/constants/constant.path";

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
      icon: <FileOutlined />,
      text: t("content.feature.Record"),
      path: UserPaths.RECORD,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <AccountBookOutlined />,
      text: "Quản lý tài khoản",
      path: managerPaths.ACCOUNT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <UsergroupAddOutlined />,
      text: "Quản lý nhân viên",
      path: managerPaths.EMPLOYEE_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileOutlined />,
      text: "Quản lý hồ sơ",
      path: managerPaths.PROFILE_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileTextOutlined />,
      text: "Quản lý hợp đồng",
      path: managerPaths.CONTRACT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <ApartmentOutlined />,
      text: "Quản lý phòng ban",
      path: managerPaths.DEPARTMENT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Quản lý công việc ",
      path: managerPaths.JOB_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      text: "Quản lý phúc lợi",
      path: managerPaths.BENEFITS_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileSearchOutlined />,
      text: "Quản lý tuyển dụng",
      path: managerPaths.RECRUITMENT_MANAGEMENT,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <SnippetsOutlined />,
      text: "Đào tạo",
      path: managerPaths.TRAINING,
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

  const featureNames =
    currentAccount?.role?.roleId === RoleId.USER ? userFeature : adminFeature;
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
        <List
          dataSource={featureList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Drawer>
    </>
  );
};
export default ManagementDrawerScreen;
