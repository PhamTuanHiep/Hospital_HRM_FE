import { Card, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { UserDetail } from "../../../../../common/common.type";
import { INIT_USER } from "../../../../../common/common.constant";
import { getUsers } from "../../../../../api/apiServices";
import "./AssignmentByRegulationTable.scss";
import { useTranslation } from "react-i18next";

const AssignmentByRegulationTable = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);
  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const usersData = res.data.data;
      setUsers(usersData);
    }
  };
  const assignmentByRegulationIndex = {
    order: "order",
    fullName: "fullName",
    positionName: "positionName",
    jobDescription: "jobDescription",
  };

  const ASSIGNMENT_BY_REGULATION_COLUMNS = [
    {
      title: t("content.user.NumericalOrder"),
      dataIndex: assignmentByRegulationIndex.order,
      key: assignmentByRegulationIndex.order,
      className: "title_content-center",
    },
    {
      title: t("content.user.FullName"),
      dataIndex: assignmentByRegulationIndex.fullName,
      key: assignmentByRegulationIndex.fullName,
    },
    {
      title: t("content.user.PositionName"),
      dataIndex: assignmentByRegulationIndex.positionName,
      key: assignmentByRegulationIndex.positionName,
    },
    {
      title: t("content.user.Content"),
      dataIndex: assignmentByRegulationIndex.jobDescription,
      key: assignmentByRegulationIndex.jobDescription,
    },
  ];

  const assignmentByRegulation = useMemo(() => {
    return users.map((userData, index) => {
      return {
        order: index + 1,
        fullName: userData.fullName,
        positionName: userData.position?.positionName,
        jobDescription: userData.jobDescription || "",
      };
    });
  }, [users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card
      title={t("content.user.AssignmentTableAccordingToRegulations")}
      bordered={false}
      id="assignment-by-regulation-card"
    >
      <Table
        columns={ASSIGNMENT_BY_REGULATION_COLUMNS}
        dataSource={assignmentByRegulation}
        pagination={false}
      />
    </Card>
  );
};
export default AssignmentByRegulationTable;
