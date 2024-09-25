import { Card, Flex, List, Table } from "antd";
import "./ScheduleScreen.scss";
import { useAppSelector } from "../../../../app/hooks";
import { useEffect, useMemo, useState } from "react";
import instance from "../../../../api/api";
import { UserApis } from "../../constants/constant.endpoint";
import {
  Department,
  Overtime,
  OvertimeHistory,
  OvertimeScheduleIndex,
  Position,
  User,
} from "../../../../common/common.type";
import { useTranslation } from "react-i18next";
import {
  ASSIGNMENT_BY_REGULATION_COLUMNS,
  OVERTIME_SCHEDULE_COLUMNS,
} from "../../constants/user.constant";

const ScheduleScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);

  const { t } = useTranslation();

  const [overtimeHistories, setOvertimeHistories] = useState<OvertimeHistory[]>(
    [
      {
        overtimeHistoryId: 1,
        userId: 0,
        overtimeId: "",
        departmentId: "",
        days: "",
        note: "",
      },
    ]
  );

  const [overtimes, setOvertimes] = useState<Overtime[]>([
    {
      overtimeId: "",
      overtimeName: "",
      overtimePay: 0,
      note: [""],
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
    weeklySchedule: [0],
    insuranceIds: ["-"],
    allowances: [""],
    allowanceIds: [0],
    evaluateId: 1,
    jobDescription: [""],
    otherDescription: "-",
    status: "-",
  });

  const [users, setUsers] = useState<User[]>([
    {
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
    },
  ]);

  const [position, setPosition] = useState<Position>({
    positionId: "",
    positionName: "",
    salaryCoefficient: 0,
    leaveId: "",
  });

  const [positions, setPositions] = useState<Position[]>([
    {
      positionId: "",
      positionName: "",
      salaryCoefficient: 0,
      leaveId: "",
    },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    {
      departmentId: "",
      departmentName: "",
    },
  ]);

  useEffect(() => {
    getUser();
  }, [currentAccount]);

  useEffect(() => {
    getOvertimeHistories();
    getPosition();
    getUsers();
    getPositions();
    getDepartments();
    getOvertimes();
  }, []);

  const getOvertimeHistories = async () => {
    const res = await instance.get(`${UserApis.OVERTIMEHISTORIES}`);
    if (res.status === 200) {
      const overtimeHistoriesData = res.data.data;
      setOvertimeHistories(overtimeHistoriesData);
    }
  };

  const getOvertimes = async () => {
    const res = await instance.get(`${UserApis.OVERTIMES}`);
    if (res.status === 200) {
      const overtimesData = res.data.data;
      setOvertimes(overtimesData);
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

  const getUsers = async () => {
    const res = await instance.get(`${UserApis.USERS}`);
    if (res.status === 200) {
      const usersData = res.data.data;
      setUsers(usersData);
    }
  };

  const getPosition = async () => {
    const res = await instance.get(`${UserApis.POSITIONS}/${user.positionId}`);
    if (res.status === 200) {
      const positionData = res.data.data;
      setPosition(positionData);
    }
  };

  const getPositions = async () => {
    const res = await instance.get(`${UserApis.POSITIONS}`);
    if (res.status === 200) {
      const positionsData = res.data.data;
      setPositions(positionsData);
    }
  };

  const getDepartments = async () => {
    const res = await instance.get(`${UserApis.DEPARTMENTS}`);
    if (res.status === 200) {
      const departmentsData = res.data.data;
      setDepartments(departmentsData);
    }
  };

  console.log("overtimeHistories:", overtimeHistories);
  console.log("user:", user);
  console.log("position:", position);

  const getDayToDaysOfOvertime = (days: string) => {
    return days.split("_")[0];
  };

  const getUserfromUserId = (userId: number, users: User[]) => {
    return (
      users.find((user) => {
        return user.userId === userId;
      })?.fullName || ""
    );
  };
  const getOvertimeNamefromOvertimeId = (
    overtimeId: string,
    overtimes: Overtime[]
  ) => {
    return overtimes.find((overtime) => {
      return overtime.overtimeId === overtimeId;
    })?.overtimeName;
  };
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

  const assignmentByRegulation = useMemo(() => {
    return users.map((userData, index) => {
      return {
        order: index + 1,
        fullName: userData.fullName,
        positionName: positions.find(
          (position) => position.positionId === userData.positionId
        )?.positionName,
        jobDescription: userData.jobDescription,
      };
    });
  }, [user]);

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
    <Flex id="benefits-screen" vertical gap={18}>
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
      <Card title="Lịch trực tuần" bordered={false} className="benefits-card">
        <Table
          columns={OVERTIME_SCHEDULE_COLUMNS}
          dataSource={overtimeSchedule}
          pagination={false}
          bordered={true}
        />
      </Card>
    </Flex>
  );
};
export default ScheduleScreen;
