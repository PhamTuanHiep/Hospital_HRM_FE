import { Card, Table } from "antd";
import { ASSIGNMENT_BY_REGULATION_COLUMNS } from "../../../constants/user.constant";
import { useEffect, useMemo, useState } from "react";
import { UserDetail } from "../../../../../common/common.type";
import { INIT_USER } from "../../../../../common/common.constant";
import { getUsers } from "../../../../../api/apiServices";
import "./AssignmentByRegulationTable.scss";

const AssignmentByRegulationTable = () => {
  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const usersData = res.data.data;
      setUsers(usersData);
    }
  };

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

  return (
    <Card
      title="Bảng phân công theo quy định"
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
