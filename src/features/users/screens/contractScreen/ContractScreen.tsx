import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, List, Space } from "antd";
import "./ContractScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useState } from "react";
import instance from "../../../../api/api";
import { UserApis } from "../../constants/constant.endpoint";
import { AccountInfo } from "./type";

const ContractScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);
  console.log("currentAccount:", currentAccount);

  const [role, setRole] = useState<string>("user");
  const [userName, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    getRole();
    getUser();
  }, [currentAccount]);

  const accountData: AccountInfo[] = [
    { lable: "email", content: currentAccount.email },
    { lable: "role", content: role },
    { lable: "UserName", content: userName },
  ];

  const getRole = async () => {
    const res = await instance.get(
      `${UserApis.ROLES}/${currentAccount.role?.roleId}`
    );
    console.log("res:", res);
    if (res.status === 200) {
      const role = res.data.data;
      setRole(role.roleName);
    }
  };

  const getUser = async () => {
    const res = await instance.get(
      `${UserApis.USERS}/${currentAccount.user?.userId}`
    );
    if (res.status === 200) {
      const user = res.data.data;
      setUserName(user.fullName);
      setAvatar(user.image);
    }
  };
  return (
    <Flex vertical={false} justify="space-between">
      <Space wrap size={16} className="avatar-wrap">
        <Avatar
          size="large"
          src={avatar}
          icon={<UserOutlined style={{ fontSize: "300%" }} />}
          shape="circle"
          className="avater-item"
        />
      </Space>
      <div className="account-descriptions">
        <h1 className="title-info">Account Info</h1>

        <List
          dataSource={accountData}
          renderItem={(item) => (
            <List.Item>
              <li className="info-item">
                <div className="lable-item">{item.lable}:</div>
                <div className="content-item">{item.content}</div>
              </li>
            </List.Item>
          )}
        />
      </div>
    </Flex>
  );
};
export default ContractScreen;
