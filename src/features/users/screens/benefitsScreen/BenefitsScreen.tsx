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
import {
  getAllowances,
  getInsurances,
  getUser,
} from "../../../../api/apiServices";
import {
  INIT_ALLOWANCE,
  INIT_INSURANCE,
  INIT_USER,
} from "../../../../common/common.constant";

const BenefitsScreen = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([INIT_INSURANCE]);

  const [user, setUser] = useState<User>(INIT_USER);

  const [allowances, setAllowances] = useState<Allowance[]>([INIT_ALLOWANCE]);

  const currentAccount = useAppSelector((state) => state.account_user.account);

  const { t } = useTranslation();

  useEffect(() => {
    fetchUser();
  }, [currentAccount]);

  useEffect(() => {
    fetchInsurances();
    fetchAllowances();
  }, []);

  const fetchInsurances = async () => {
    const res = await getInsurances();
    if (res.status === 200) {
      const insuranceData = res.data.data;
      setInsurances(insuranceData);
    }
  };

  const fetchUser = async () => {
    const res = await getUser(currentAccount.userId);
    if (res.status === 200) {
      const userData = res.data.data;
      setUser(userData);
    }
  };

  const fetchAllowances = async () => {
    const res = await getAllowances();
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
