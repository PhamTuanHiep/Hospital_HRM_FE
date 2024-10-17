import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, List, Space, Table } from "antd";
import "./RecordScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useMemo, useState } from "react";

import { UserInfo } from "./type";
import { UserDetail } from "../../../../common/common.type";
import { useTranslation } from "react-i18next";
import { getDDMMYYYYfromISO8601DateString } from "../../../../common/common.helper";
import { getUser } from "../../../../api/apiServices";
import { Gender, INIT_USER } from "../../../../common/common.constant";
import { USER_INFO_COLUMNS } from "../../constants/user.constant";

const RecordScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);
  const [user, setUser] = useState<UserDetail>(INIT_USER);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUser();
  }, [currentAccount]);

  const fetchUser = async () => {
    if (currentAccount.user?.userId) {
      const res = await getUser(currentAccount.user?.userId);

      if (res) {
        const user = res.data;
        setUser(user);
      }
    }
  };

  const userData: UserInfo[] = [
    { label: t("content.info.Email"), content: currentAccount.email },
    {
      label: t("content.info.Role"),
      content: currentAccount.role?.roleName || "",
    },
    {
      label: t("content.info.UserName"),
      content: currentAccount.user?.fullName || "",
    },
    {
      label: t("content.info.Gender"),
      content:
        user.gender === Gender.MALE
          ? t("content.other.Male")
          : t("content.other.Female"),
    },
    { label: t("content.info.PhoneNumber"), content: user.phoneNumber },
    { label: t("content.info.Birthday"), content: user.birthday },
  ];

  interface AddUserInfo {
    selfInfo: string;
    parentInfo: string;
  }
  const userInfo = useMemo(() => {
    const infoShow: AddUserInfo[] = [
      {
        selfInfo: `${t("content.info.Hometown")}: ${user.hometown}`,
        parentInfo: `${t("content.info.FatherName")}: ${user.fatherFullName}`,
      },
      {
        selfInfo: `${t("content.info.Address")}: ${user.address}`,
        parentInfo: `${t("content.info.FatherBirthday")}: ${
          user.fatherBirthday
        }`,
      },
      {
        selfInfo: `${t("content.info.Nation")}: ${user.nation}`,
        parentInfo: `${t("content.info.MotherName")}: ${user.motherFullName}`,
      },
      {
        selfInfo: `${t("content.info.Nationality")}: ${user.nationality}`,
        parentInfo: `${t("content.info.MotherBirthday")}: ${
          user.motherBirthday
        }`,
      },
    ];
    return infoShow;
  }, [user]);

  return (
    <Flex vertical={false} id="record-screen" gap={24}>
      <Flex vertical className="user-info" justify="space-between">
        <Space size={16} className="avatar-wrap">
          <Avatar
            size="large"
            src={currentAccount.avatar}
            icon={<UserOutlined style={{ fontSize: "150%" }} />}
            shape="circle"
            className="avater-item"
          />
        </Space>
        <span>
          {t("content.info.DateOfJoining")}:{" "}
          {getDDMMYYYYfromISO8601DateString(currentAccount.createdAt)}
        </span>
        <div className="account-descriptions">
          {/* <h3 className="title-info">Recor d Info</h3> */}

          <List
            dataSource={userData}
            renderItem={(item) => (
              <List.Item>
                <li className="info-item">
                  <div className="lable-item">{item.label}:</div>
                  <div className="content-item">{item.content}</div>
                </li>
              </List.Item>
            )}
          />
        </div>
      </Flex>
      <Flex vertical={false} justify="space-around" align="center">
        <Table
          columns={USER_INFO_COLUMNS}
          dataSource={userInfo}
          pagination={false}
          showHeader={false}
        />
        {/* <List
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
          )} */}
        {/* /> */}
      </Flex>
    </Flex>
  );
};
export default RecordScreen;
