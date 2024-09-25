import { Card, Table } from "antd";
import { ASSIGNMENT_BY_REGULATION_COLUMNS } from "../../../constants/user.constant";
import { useEffect, useMemo, useState } from "react";
import { Position, User } from "../../../../../common/common.type";
import { useAppSelector } from "../../../../../app/hooks";
import {
  INIT_POSOTION,
  INIT_USER,
} from "../../../../../common/common.constant";
import {
  getPositions,
  getUser,
  getUsers,
} from "../../../../../api/apiServices";

const AssignmentByRegulationTable = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);

  const [users, setUsers] = useState<User[]>([INIT_USER]);

  const [user, setUser] = useState<User>(INIT_USER);

  const [positions, setPositions] = useState<Position[]>([INIT_POSOTION]);

  useEffect(() => {
    fetchUser();
  }, [currentAccount]);

  useEffect(() => {
    fetchUsers();
    fetchPositions();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res.status === 200) {
      const usersData = res.data.data;
      setUsers(usersData);
    }
  };

  const fetchPositions = async () => {
    const res = await getPositions();
    if (res.status === 200) {
      const positionsData = res.data.data;
      setPositions(positionsData);
    }
  };

  const fetchUser = async () => {
    const res = await getUser(currentAccount.userId);
    if (res.status === 200) {
      const userData = res.data.data;
      setUser(userData);
    }
  };

  const assignmentByRegulation = useMemo(() => {
    return users.map((userData, index) => {
      return {
        order: index + 1,
        fullName: userData.fullName,
        positionName:
          positions.find(
            (position) => position.positionId === userData.positionId
          )?.positionName || "",
        jobDescription: userData.jobDescription || "",
      };
    });
  }, [user]);

  return (
    <Card
      title="Bảng phân công theo quy định"
      bordered={false}
      className="benefits-card"
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
