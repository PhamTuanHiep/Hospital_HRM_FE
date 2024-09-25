import { Card, List, Table } from "antd";
import { OVERTIME_SCHEDULE_COLUMNS } from "../../../constants/user.constant";
import {
  Department,
  Overtime,
  OvertimeHistory,
  User,
} from "../../../../../common/common.type";
import { useEffect, useMemo, useState } from "react";
import instance from "../../../../../api/api";
import { UserApis } from "../../../constants/constant.endpoint";
import {
  getDayToDaysOfOvertime,
  getOvertimeNamefromOvertimeId,
  getUserfromUserId,
} from "../../../../../common/common.helper";
import {
  INIT_DEPARTMENT,
  INIT_OVERTIME,
  INIT_OVERTIME_HISTORY,
  INIT_USER,
} from "../../../../../common/common.constant";
import {
  getDepartments,
  getOvertimeHistories,
  getOvertimes,
  getUsers,
} from "../../../../../api/apiServices";

const OvertimeScheduleTable = () => {
  const [departments, setDepartments] = useState<Department[]>([
    INIT_DEPARTMENT,
  ]);

  const [users, setUsers] = useState<User[]>([INIT_USER]);

  const [overtimes, setOvertimes] = useState<Overtime[]>([INIT_OVERTIME]);

  const [overtimeHistories, setOvertimeHistories] = useState<OvertimeHistory[]>(
    [INIT_OVERTIME_HISTORY]
  );

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
    fetchOvertimes();
    fetchOvertimeHistories();
  }, []);

  const getOvertimePeopleAccordingToDayofTheWeek = (
    overtimeHistories: OvertimeHistory[],
    day: number,
    departmentId: string
  ) => {
    let accordingDepartments: OvertimeHistory[] = overtimeHistories.filter(
      (overtimeHistoryData) => {
        return overtimeHistoryData.departmentId === departmentId;
      }
    );
    let accordingDay = accordingDepartments.filter((accordingDepartment) => {
      return getDayToDaysOfOvertime(accordingDepartment.days) === `Thu ${day}`;
    });

    return accordingDay.map((accordingDayData) => {
      return (
        <List>
          <List.Item>
            <div>{getUserfromUserId(accordingDayData.userId, users)}</div>
            <div>
              {getOvertimeNamefromOvertimeId(
                accordingDayData.overtimeId,
                overtimes
              )}
            </div>
          </List.Item>
        </List>
      );
    });
  };

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res.status === 200) {
      const usersData = res.data.data;
      setUsers(usersData);
    }
  };

  const fetchDepartments = async () => {
    const res = await getDepartments();
    if (res.status === 200) {
      const departmentsData = res.data.data;
      setDepartments(departmentsData);
    }
  };

  const fetchOvertimes = async () => {
    const res = await getOvertimes();
    if (res.status === 200) {
      const overtimesData = res.data.data;
      setOvertimes(overtimesData);
    }
  };

  const fetchOvertimeHistories = async () => {
    const res = await getOvertimeHistories();
    if (res.status === 200) {
      const overtimeHistoriesData = res.data.data;
      setOvertimeHistories(overtimeHistoriesData);
    }
  };
  const overtimeSchedule = useMemo(() => {
    return departments.map((departmentData, index) => {
      return {
        order: index + 1,
        departmentName: departmentData.departmentName,
        monday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          2,
          departmentData.departmentId
        ),

        tuesday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          3,
          departmentData.departmentId
        ),

        wednesday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          4,
          departmentData.departmentId
        ),

        thursday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          5,
          departmentData.departmentId
        ),

        friday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          6,
          departmentData.departmentId
        ),

        saturday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          7,
          departmentData.departmentId
        ),

        sunday: getOvertimePeopleAccordingToDayofTheWeek(
          overtimeHistories,
          8,
          departmentData.departmentId
        ),
      };
    });
  }, [departments]);

  return (
    <Card title="Lịch trực tuần" bordered={false} className="benefits-card">
      <Table
        columns={OVERTIME_SCHEDULE_COLUMNS}
        dataSource={overtimeSchedule}
        pagination={false}
        bordered={true}
      />
    </Card>
  );
};
export default OvertimeScheduleTable;
