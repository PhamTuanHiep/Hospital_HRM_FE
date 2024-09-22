import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, List, Space } from "antd";
import "./RecordScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useState } from "react";
import instance from "../../../../api/api";
import { UserApis } from "../../constants/constant.endpoint";
import { UserInfo } from "./type";

const RecordScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);
  console.log("currentAccount:", currentAccount);

  const [role, setRole] = useState<string>("user");
  const [userName, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    getRole();
    getUser();
  }, [currentAccount]);

  const userData: UserInfo[] = [
    { lable: "Email", content: currentAccount.email },
    { lable: "Role", content: role },
    { lable: "User name", content: userName },
    { lable: "Gender", content: userName },
    { lable: "Phone number", content: userName },
    { lable: "Birthday", content: userName },
  ];

  const addUserData1: UserInfo[] = [
    { lable: "Hometown", content: currentAccount.email },
    { lable: "Address", content: role },
    { lable: "Nation", content: userName },
    { lable: "Nationality", content: userName },
  ];

  const addUserData2: UserInfo[] = [
    { lable: "Father name", content: currentAccount.email },
    { lable: "Father birthday", content: role },
    { lable: "Mother name", content: userName },
    { lable: "Mother birthday", content: userName },
  ];

  const getRole = async () => {
    const res = await instance.get(
      `${UserApis.ROLES}/${currentAccount.roleId}`
    );
    console.log("res:", res);
    if (res.status === 200) {
      const role = res.data.data;
      setRole(role.roleName);
    }
  };

  const getUser = async () => {
    const res = await instance.get(
      `${UserApis.USERS}/${currentAccount.userId}`
    );
    if (res.status === 200) {
      const user = res.data.data;
      setUserName(user.fullName);
      setAvatar(user.image);
    }
  };
  return (
    <Flex vertical id="record-screen">
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
          <h1 className="title-info">Recor d Info</h1>

          <List
            dataSource={userData}
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
      <Flex vertical={false} className="add-info" justify="space-between">
        <List
          dataSource={addUserData1}
          renderItem={(item) => (
            <List.Item>
              <li className="info-item">
                <div className="lable-item">{item.lable}:</div>
                <div className="content-item">{item.content}</div>
              </li>
            </List.Item>
          )}
        />
        <List
          dataSource={addUserData2}
          renderItem={(item) => (
            <List.Item>
              <li className="info-item">
                <div className="lable-item">{item.lable}:</div>
                <div className="content-item">{item.content}</div>
              </li>
            </List.Item>
          )}
        />
      </Flex>
    </Flex>
  );
};
export default RecordScreen;
