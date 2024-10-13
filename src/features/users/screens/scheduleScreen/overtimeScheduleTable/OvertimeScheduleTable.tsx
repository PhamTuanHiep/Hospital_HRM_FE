import { Card, Flex, List, Table } from "antd";
import { OVERTIME_SCHEDULE_COLUMNS } from "../../../constants/user.constant";
import {
  DepartmentDetail,
  OvertimeDetail,
  OvertimeHistoryDepartmentShortInfo,
  UserDetail,
} from "../../../../../common/common.type";
import { useEffect, useMemo, useState } from "react";
import {
  checkDayOfWeek,
  getOvertimeNameFromOvertimeId,
  getUserNameFromUserId,
  timeStartToEndOfAWeek,
} from "../../../../../common/common.helper";
import {
  INIT_DEPARTMENT,
  INIT_OVERTIME,
  INIT_USER,
} from "../../../../../common/common.constant";
import {
  getDepartments,
  getOvertimes,
  getUsers,
} from "../../../../../api/apiServices";
import "./OvertimeScheduleTable.scss";

const OvertimeScheduleTable = () => {
  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);

  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);

  const [overtimes, setOvertimes] = useState<OvertimeDetail[]>([INIT_OVERTIME]);

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
    fetchOvertimes();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const usersData = res.data.data;
      setUsers(usersData);
    }
  };

  const fetchDepartments = async () => {
    const res = await getDepartments();
    if (res) {
      const departmentsData = res.data.data;
      setDepartments(departmentsData);
    }
  };

  const fetchOvertimes = async () => {
    const res = await getOvertimes();
    if (res) {
      const overtimesData = res.data.data;
      setOvertimes(overtimesData);
    }
  };

  const getOvertimePeopleAccordingToDayOfTheWeek = (
    overtimeHistories: OvertimeHistoryDepartmentShortInfo[] | null,
    day: number,
    next?: boolean
  ) => {
    const isNext = !!next;
    let accordingDay = overtimeHistories?.filter((overtimeHistory) => {
      return checkDayOfWeek(overtimeHistory.startDay, day, isNext);
    });
    console.log("accordingDay:", accordingDay);
    return accordingDay?.map((accordingDayData) => {
      return (
        <List>
          <List.Item>
            <div>{getUserNameFromUserId(accordingDayData.userId, users)}</div>
            <div>
              {getOvertimeNameFromOvertimeId(
                accordingDayData.overtimeId,
                overtimes
              )}
            </div>
          </List.Item>
        </List>
      );
    });
  };

  const getOvertimeHistories = (
    departmentData: DepartmentDetail,
    index: number,
    next?: boolean
  ) => {
    const isNext = !!next;
    return {
      order: index + 1,
      departmentName: departmentData.departmentName,
      monday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        2,
        isNext
      ),

      tuesday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        3,
        isNext
      ),

      wednesday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        4,
        isNext
      ),

      thursday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        5,
        isNext
      ),

      friday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        6,
        isNext
      ),

      saturday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        7,
        isNext
      ),

      sunday: getOvertimePeopleAccordingToDayOfTheWeek(
        departmentData.overtimeHistories,
        8,
        isNext
      ),
    };
  };

  const overtimeSchedule = useMemo(() => {
    return departments.map((departmentData, index) => {
      return getOvertimeHistories(departmentData, index);
    });
  }, [departments]);

  const overtimeScheduleOnNextWeek = useMemo(() => {
    return departments.map((departmentData, index) => {
      return getOvertimeHistories(departmentData, index, true);
    });
  }, [departments]);

  return (
    <Flex vertical gap={18}>
      <Card
        title={`Lịch trực tuần hiện tại ${timeStartToEndOfAWeek()}`}
        bordered={false}
        id="overtime-schedule-card"
      >
        <Table
          columns={OVERTIME_SCHEDULE_COLUMNS}
          dataSource={overtimeSchedule}
          pagination={false}
          bordered={true}
          scroll={{ x: 1200 }}
        />
      </Card>
      <Card
        title={`Lịch trực tuần kế tiếp ${timeStartToEndOfAWeek(true)}`}
        bordered={false}
        id="overtime-schedule-card"
      >
        <Table
          columns={OVERTIME_SCHEDULE_COLUMNS}
          dataSource={overtimeScheduleOnNextWeek}
          pagination={false}
          bordered={true}
          scroll={{ x: 1200 }}
        />
      </Card>
    </Flex>
  );
};
export default OvertimeScheduleTable;
