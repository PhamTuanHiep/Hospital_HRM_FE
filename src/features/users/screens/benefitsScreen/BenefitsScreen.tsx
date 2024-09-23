import { Card, Flex, Table } from "antd";
import "./BenefitsScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useMemo, useState } from "react";
import instance from "../../../../api/api";
import { UserApis } from "../../constants/constant.endpoint";
import { Allowance, Insurance, User } from "../../../../common/common.type";
import {
  ALLOWANCE_COLUMNS,
  INSURANCES_COLUMNS,
} from "../../constants/user.constant";
import { useTranslation } from "react-i18next";

const BenefitsScreen = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([
    {
      insuranceId: "-",
      insuranceName: "-",
      insuranceType: "-",
      monthlyPercentage: 0,
      note: "-",
    },
  ]);

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
    insuranceIds: ["-"],
    allowanceIds: [0],
    evaluateId: 1,
    description: "-",
    status: "-",
  });

  const [allowances, setAllowances] = useState<Allowance[]>([
    {
      allowanceId: 0,
      allowanceAcronym: "-",
      allowanceName: "-",
      allowanceType: "-",
      allowanceRate: 0,
      allowanceFee: 0,
      note: "-",
    },
  ]);

  const currentAccount = useAppSelector((state) => state.account_user.account);

  const { t } = useTranslation();

  useEffect(() => {
    getUser();
  }, [currentAccount]);

  useEffect(() => {
    getInsurances();
    getAllowances();
  }, []);

  const getInsurances = async () => {
    const res = await instance.get(`${UserApis.INSURANCES}`);
    console.log("res:", res);
    if (res.status === 200) {
      const insuranceData = res.data.data;
      setInsurances(insuranceData);
    }
  };

  const getUser = async () => {
    const res = await instance.get(
      `${UserApis.USERS}/${currentAccount.userId}`
    );
    if (res.status === 200) {
      const userData = res.data.data;
      setUser(userData);
    }
  };

  const getAllowances = async () => {
    const res = await instance.get(`${UserApis.ALLOWANCES}`);
    if (res.status === 200) {
      const allowanceData = res.data.data;
      setAllowances(allowanceData);
    }
  };

  const insuranceData = useMemo(() => {
    return insurances.map((insurance) => {
      return {
        ...insurance,
        note: user?.insuranceIds.includes(insurance?.insuranceId)
          ? t("content.allowance.Participated")
          : t("content.allowance.NotParticipated"),
      };
    });
  }, [insurances]);

  const allowanceData = useMemo(() => {
    let userAllowance: Allowance[] = [];
    allowances.forEach((allowance) => {
      if (user.allowanceIds.includes(allowance.allowanceId)) {
        userAllowance.push(allowance);
      }
    });
    return userAllowance;
  }, allowances);

  return (
    <Flex id="benefits-screen" vertical gap={18}>
      <Card
        className="benefits-card"
        title={t("content.allowance.TypesOfInsurance")}
        bordered={false}
      >
        <Table
          columns={INSURANCES_COLUMNS}
          dataSource={insuranceData}
          pagination={false}
        />
      </Card>
      <Card
        title={t("content.allowance.Benefits")}
        bordered={false}
        className="benefits-card"
      >
        <Table
          columns={ALLOWANCE_COLUMNS}
          dataSource={allowanceData}
          pagination={false}
        />
      </Card>
    </Flex>
  );
};
export default BenefitsScreen;
