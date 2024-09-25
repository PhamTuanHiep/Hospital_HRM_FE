import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, List, Space } from "antd";
import "./AccountInfoScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useState } from "react";

import { AccountInfo } from "./type";
import { getRole, getUser } from "../../../../api/apiServices";

const AccountInfoScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);

  const [roleName, setRoleName] = useState<string>("User");
  const [userName, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    fetchRole();
    fetchUser();
  }, [currentAccount]);

  const accountData: AccountInfo[] = [
    { lable: "email", content: currentAccount.email },
    { lable: "role", content: roleName },
    { lable: "UserName", content: userName },
  ];

  const fetchRole = async () => {
    const res = await getRole(currentAccount.roleId);
    if (res.status === 200) {
      const role = res.data.data;
      setRoleName(role.roleName);
    }
  };

  const fetchUser = async () => {
    const res = await getUser(currentAccount.userId);
    if (res.status === 200) {
      const user = res.data.data;
      setUserName(user.fullName);
      setAvatar(user.image);
    }
  };
  return (
    <Flex className="account-info" vertical={false} justify="space-between">
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
export default AccountInfoScreen;
