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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../features/auth/constants/accountSlice";
import { UserPaths } from "../../features/users/constants/constant.path";
import { useState } from "react";

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

  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );

  const adminFeature: FeatureName[] = [
    {
      icon: <UserOutlined />,
      text: " Thông tin tài khoản",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <AccountBookOutlined />,
      text: "Quản lý tài khoản",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <UsergroupAddOutlined />,
      text: "Quản lý nhân viên",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <FileOutlined />,
      text: "Quản lý hồ sơ",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <FileTextOutlined />,
      text: "Quản lý hợp đồng",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <ApartmentOutlined />,
      text: "Quản lý phòng ban",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Quản lý công việc ",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      text: "Quản lý phúc lợi",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <FileSearchOutlined />,
      text: "Quản lý tuyển dụng",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <SnippetsOutlined />,
      text: "Đào tạo",
      fn: (e: any) => {
        // dispatch(doLogout());
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

  // const [userFeature, setUserFeature] = useState<FeatureName[]>([
  //   {
  //     icon: <UserOutlined />,
  //     text: " Thông tin tài khoản",
  //     path: UserPaths.ACCOUNT_INFO,
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <FileOutlined />,
  //     text: "Hồ sơ",
  //     path: UserPaths.RECORD,
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <FileTextOutlined />,
  //     path: UserPaths.CONTRACT,

  //     text: "Hợp đồng",
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <MoneyCollectOutlined />,
  //     path: UserPaths.BENEFITS,

  //     text: "Bảo hiểm & Trợ cấp",
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <InsertRowAboveOutlined />,
  //     text: "Lịch phân công tuần, Lịch trực",
  //     path: UserPaths.SCHEDULE,

  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <BellOutlined />,
  //     path: UserPaths.NOTIFICATION,

  //     text: "Thông báo",
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <FileDoneOutlined />,
  //     path: UserPaths.TRAINING_RESULTS,

  //     text: "Kết quả đào tạo",
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <ProfileOutlined />,
  //     path: UserPaths.WORKPERFORMANCESCREEN,

  //     text: "Hiệu suất công việc",
  //     fn: (e: any) => {
  //       navigate(this.path);
  //     },
  //   },
  //   {
  //     icon: <LogoutOutlined />,
  //     text: "Đăng xuất",
  //     fn: (e: any) => {
  //       dispatch(doLogout(currentAccount));
  //       setOpen(false);

  //       navigate("/");
  //     },
  //   },
  // ]);
  const userFeature: FeatureName[] = [
    {
      icon: <UserOutlined />,
      text: " Thông tin tài khoản",
      path: UserPaths.ACCOUNT_INFO,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileOutlined />,
      text: "Hồ sơ",
      path: UserPaths.RECORD,
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileTextOutlined />,
      path: UserPaths.CONTRACT,

      text: "Hợp đồng",
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      path: UserPaths.BENEFITS,

      text: "Bảo hiểm & Trợ cấp",
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Lịch phân công tuần, Lịch trực",
      path: UserPaths.SCHEDULE,

      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <BellOutlined />,
      path: UserPaths.NOTIFICATION,

      text: "Thông báo",
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <FileDoneOutlined />,
      path: UserPaths.TRAINING_RESULTS,

      text: "Kết quả đào tạo",
      fn: (e: any) => {
        setOpen(false);
      },
    },
    {
      icon: <ProfileOutlined />,
      path: UserPaths.WORK_PERFORMANCE_SCREEN,

      text: "Hiệu suất công việc",
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

  type User = {
    name: string;
    age: number;
    getDetails: () => string;
  };

  const [users, setUsers] = useState<User[]>([
    {
      name: "John",
      age: 30,
      getDetails: function () {
        console.log("this.name:", this.name);
        return `Name: ${this.name}, Age: ${this.age}`;
      },
    },
    {
      name: "Jane",
      age: 25,
      getDetails: function () {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
    },
  ]);
  console.log("users:", users);
  const featureNames =
    currentAccount?.roleId === RoleId.ADMIN ? adminFeature : userFeature;
  const featureList = featureNames.map((featureName) => (
    <Link to={featureName.path}>
      <Flex onClick={(e) => featureName.fn(e)}>
        <div className="item-icon">{featureName.icon}</div>
        <div className="item-content">{featureName.text}</div>
      </Flex>
    </Link>
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
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          dataSource={featureList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Drawer>
    </>
  );
};
export default ManagementDrawerScreen;
