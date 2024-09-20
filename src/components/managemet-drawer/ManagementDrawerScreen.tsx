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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../features/auth/constants/accountSlice";

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
        navigate("/");
      },
    },
  ];

  const userFeature: FeatureName[] = [
    {
      icon: <UserOutlined />,
      text: " Thông tin tài khoản",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <FileOutlined />,
      text: "Hồ sơ",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <FileTextOutlined />,
      text: "Hợp đồng",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <MoneyCollectOutlined />,
      text: "Bảo hiểm",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Lịch phân công tuần, Lịch trực",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <BellOutlined />,
      text: "Thông báo",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <FileDoneOutlined />,
      text: "Kết quả đào tạo",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <ProfileOutlined />,
      text: "Hiệu suất công việc",
      fn: (e: any) => {
        // dispatch(doLogout());
      },
    },
    {
      icon: <LogoutOutlined />,
      text: "Đăng xuất",
      fn: (e: any) => {
        dispatch(doLogout(currentAccount));
        navigate("/login");
      },
    },
  ];

  const featureNames =
    currentAccount?.roleId === RoleId.ADMIN ? adminFeature : userFeature;
  const featureList = featureNames.map((featureName) => (
    <>
      <Flex onClick={(e) => featureName.fn(e)}>
        <div className="item-icon">{featureName.icon}</div>
        <div className="item-content">{featureName.text}</div>
      </Flex>
    </>
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
