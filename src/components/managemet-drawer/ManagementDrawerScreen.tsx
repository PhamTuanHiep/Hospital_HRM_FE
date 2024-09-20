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

interface ManagementDrawerProps {
  open: boolean;
  setOpen: Function;
}

const ManagementDrawerScreen = ({ open, setOpen }: ManagementDrawerProps) => {
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
    },
    {
      icon: <AccountBookOutlined />,
      text: "Quản lý tài khoản",
    },
    {
      icon: <UsergroupAddOutlined />,
      text: "Quản lý nhân viên",
    },
    {
      icon: <FileOutlined />,
      text: "Quản lý hồ sơ",
    },
    {
      icon: <FileTextOutlined />,
      text: "Quản lý hợp đồng",
    },
    {
      icon: <ApartmentOutlined />,
      text: "Quản lý phòng ban",
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Quản lý công việc ",
    },
    {
      icon: <MoneyCollectOutlined />,
      text: "Quản lý phúc lợi",
    },
    {
      icon: <FileSearchOutlined />,
      text: "Quản lý tuyển dụng",
    },
    {
      icon: <SnippetsOutlined />,
      text: "Đào tạo",
    },
    {
      icon: <LogoutOutlined />,
      text: "Đăng xuất",
    },
  ];

  const userFeature: FeatureName[] = [
    {
      icon: <UserOutlined />,
      text: " Thông tin tài khoản",
    },
    {
      icon: <FileOutlined />,
      text: "Hồ sơ",
    },
    {
      icon: <FileTextOutlined />,
      text: "Hợp đồng",
    },
    {
      icon: <MoneyCollectOutlined />,
      text: "Bảo hiểm",
    },
    {
      icon: <InsertRowAboveOutlined />,
      text: "Lịch phân công tuần, Lịch trực",
    },
    {
      icon: <BellOutlined />,
      text: "Thông báo",
    },
    {
      icon: <FileDoneOutlined />,
      text: "Kết quả đào tạo",
    },
    {
      icon: <ProfileOutlined />,
      text: "Hiệu suất công việc",
    },
    {
      icon: <LogoutOutlined />,
      text: "Đăng xuất",
    },
  ];

  const featureNames =
    currentAccount?.roleId === RoleId.ADMIN ? adminFeature : userFeature;
  const featureList = featureNames.map((featureName) => (
    <>
      <Flex>
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
