import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, List, Space } from "antd";
import "./RecordScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useState } from "react";
import instance from "../../../../api/api";
import { UserApis } from "../../constants/constant.endpoint";
import { UserInfo } from "./type";
import { Gender, Role, User } from "../../../../common/common.type";
import { useTranslation } from "react-i18next";
import { getDDMMYYYYfromISO8601DateString } from "../../../../common/common.helper";
import { getRandomRole } from "../../../../api/services";

const RecordScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);

  const [role, setRole] = useState<Role>({
    roleId: "user",
    roleName: "User",
  });
  const [user, setUser] = useState<User>({
    userId: 1,
    fullName: "-",
    gender: "-",
    address: "-",
    phoneNumber: "-",
    nation: "-",
    nationality: "-",
    hometown: "-",
    positionId: "-",
    birthday: "-",
    image: "-",
    fatherFullName: "-",
    fatherBirthday: "-",
    motherFullName: "-",
    motherBirthday: "-",
    departmentId: "-",
    weeklySchedule: [0],
    insuranceIds: ["-"],
    allowances: [""],
    allowanceIds: [0],
    evaluateId: 1,
    jobDescription: [""],
    otherDescription: "-",
    status: "-",
  });
  const [avatar, setAvatar] = useState<string>("");

  const { t } = useTranslation();
  useEffect(() => {
    getRole();
    getUser();
    let randomRole = getRandomRole();
  }, [currentAccount]);
  console.log("randomRole:", randomRole);
  const userData: UserInfo[] = [
    { lable: t("content.info.Email"), content: currentAccount.email },
    { lable: t("content.info.Role"), content: role.roleName },
    { lable: t("content.info.UserName"), content: user.fullName },
    {
      lable: t("content.info.Gender"),
      content:
        user.gender === Gender.MALE.toString()
          ? t("content.other.Male")
          : t("content.other.Female"),
    },
    { lable: t("content.info.PhoneNumber"), content: user.phoneNumber },
    { lable: t("content.info.Birthday"), content: user.birthday },
  ];

  const addUserData1: UserInfo[] = [
    { lable: t("content.info.Hometown"), content: user.hometown },
    { lable: t("content.info.Address"), content: user.address },
    { lable: t("content.info.Nation"), content: user.nation },
    { lable: t("content.info.Nationality"), content: user.nationality },
  ];

  const addUserData2: UserInfo[] = [
    { lable: t("content.info.FatherName"), content: user.fatherFullName },
    { lable: t("content.info.FatherBirthday"), content: user.fatherBirthday },
    { lable: t("content.info.MotherName"), content: user.motherFullName },
    { lable: t("content.info.MotherBirthday"), content: user.motherBirthday },
  ];

  const getRole = async () => {
    const res = await instance.get(
      `${UserApis.ROLES}/${currentAccount.roleId}`
    );
    if (res.status === 200) {
      const role = res.data.data;
      setRole(role);
    }
  };

  const getUser = async () => {
    const res = await instance.get(
      `${UserApis.USERS}/${currentAccount.userId}`
    );
    if (res.status === 200) {
      const user = res.data.data;
      setUser(user);
      setAvatar(user.image);
    }
  };

  return (
    <Flex vertical={false} id="record-screen">
      <Flex vertical className="user-info" justify="space-between">
        <Space size={16} className="avatar-wrap">
          <Avatar
            size="large"
            src={avatar}
            icon={<UserOutlined style={{ fontSize: "150%" }} />}
            shape="circle"
            className="avater-item"
          />
        </Space>
        <span>
          {t("content.info.DateOfJoining")}:{" "}
          {getDDMMYYYYfromISO8601DateString(user.createdAt)}
        </span>
        <div className="account-descriptions">
          {/* <h3 className="title-info">Recor d Info</h3> */}

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
      <Flex vertical={false} className="add-info" justify="space-around">
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
