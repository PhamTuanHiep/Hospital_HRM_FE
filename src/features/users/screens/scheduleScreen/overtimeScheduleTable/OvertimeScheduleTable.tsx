import { Card, Flex, List, Table } from "antd";
import {
  DepartmentDetail,
  OvertimeHistoryDepartmentShortInfo,
} from "../../../../../common/common.type";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  checkDayOfWeek,
  timeStartToEndOfAWeek,
} from "../../../../../common/common.helper";
import { INIT_DEPARTMENT } from "../../../../../common/common.constant";
import { getDepartments } from "../../../../../api/apiServices";
import "./OvertimeScheduleTable.scss";
import { useTranslation } from "react-i18next";

interface OvertimeScheduleTableProps {
  reset?: boolean;
}
const OvertimeScheduleTable = ({
  reset = false,
}: OvertimeScheduleTableProps) => {
  const { t } = useTranslation();

  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);

  const fetchDepartments = useCallback(async () => {
    const res = await getDepartments();
    if (res) {
      const departmentsData = res.data.data;
      setDepartments(departmentsData);
    }
  }, []);

  const getOvertimePeopleAccordingToDayOfTheWeek = useCallback(
    (
      overtimeHistories: OvertimeHistoryDepartmentShortInfo[] | null,
      day: number,
      next?: boolean
    ) => {
      const isNext = !!next;
      const accordingDay = overtimeHistories?.filter((overtimeHistory) => {
        return checkDayOfWeek(overtimeHistory.startDay, day, isNext);
      }) as OvertimeHistoryDepartmentShortInfo[];
      return accordingDay?.map((accordingDayData) => {
        return (
          <List>
            <List.Item>
              <div>{accordingDayData.user.fullName} </div>
              <div>{accordingDayData.overtime.overtimeName}</div>
            </List.Item>
          </List>
        );
      });
    },
    []
  );

  const getOvertimeHistoriesData = useCallback(
    (departmentData: DepartmentDetail, index: number, next?: boolean) => {
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
    },
    [getOvertimePeopleAccordingToDayOfTheWeek]
  );

  const overtimeSchedule = useMemo(() => {
    return departments.map((departmentData, index) => {
      return getOvertimeHistoriesData(departmentData, index);
    });
  }, [departments, getOvertimeHistoriesData]);

  const overtimeScheduleOnNextWeek = useMemo(() => {
    return departments.map((departmentData, index) => {
      return getOvertimeHistoriesData(departmentData, index, true);
    });
  }, [departments, getOvertimeHistoriesData]);

  const overtimeScheduleIndex = {
    order: "order",
    departmentName: "departmentName",
    monday: "monday",
    tuesday: "tuesday",
    wednesday: "wednesday",
    thursday: "thursday",
    friday: "friday",
    saturday: "saturday",
    sunday: "sunday",
  };

  const OVERTIME_SCHEDULE_COLUMNS = [
    {
      title: t("content.user.NumericalOrder"),
      dataIndex: overtimeScheduleIndex.order,
      key: overtimeScheduleIndex.order,
      className: "title_content-center",
    },
    {
      title: t("content.user.DepartmentName"),
      dataIndex: overtimeScheduleIndex.departmentName,
      key: overtimeScheduleIndex.departmentName,
      width: 200,
    },
    {
      title: t("content.user.Monday"),
      dataIndex: overtimeScheduleIndex.monday,
      key: overtimeScheduleIndex.monday,
      width: 300,
    },
    {
      title: t("content.user.Tuesday"),
      dataIndex: overtimeScheduleIndex.tuesday,
      key: overtimeScheduleIndex.tuesday,
      width: 300,
    },
    {
      title: t("content.user.Wednesday"),
      dataIndex: overtimeScheduleIndex.wednesday,
      key: overtimeScheduleIndex.wednesday,
      width: 300,
    },
    {
      title: t("content.user.Thursday"),

      dataIndex: overtimeScheduleIndex.thursday,
      key: overtimeScheduleIndex.thursday,
      width: 300,
    },
    {
      title: t("content.user.Friday"),

      dataIndex: overtimeScheduleIndex.friday,
      key: overtimeScheduleIndex.friday,
      width: 300,
    },
    {
      title: t("content.user.Saturday"),

      dataIndex: overtimeScheduleIndex.saturday,
      key: overtimeScheduleIndex.saturday,
      width: 300,
    },
    {
      title: t("content.user.Sunday"),

      dataIndex: overtimeScheduleIndex.sunday,
      key: overtimeScheduleIndex.sunday,
      width: 300,
    },
  ];

  useEffect(() => {
    fetchDepartments();
  }, [reset, fetchDepartments]);

  console.log("overtimeSchedule:", overtimeSchedule);
  return (
    <Flex vertical gap={18}>
      <Card
        title={`${t(
          "content.user.CurrentWeekSchedule"
        )} ${timeStartToEndOfAWeek()}`}
        bordered={false}
        id="overtime-schedule-card"
      >
        <Table
          columns={OVERTIME_SCHEDULE_COLUMNS}
          dataSource={overtimeSchedule}
          pagination={false}
          bordered={true}
          showSorterTooltip={{ target: "full-header" }}
          scroll={{ x: "max-content" }}
        />
      </Card>
      <Card
        title={`${t("content.user.NextWeekSchedule")} ${timeStartToEndOfAWeek(
          true
        )}`}
        bordered={false}
        id="overtime-schedule-card"
      >
        <Table
          columns={OVERTIME_SCHEDULE_COLUMNS}
          dataSource={overtimeScheduleOnNextWeek}
          pagination={false}
          bordered={true}
          showSorterTooltip={{ target: "full-header" }}
          scroll={{ x: "max-content" }}
        />
      </Card>
    </Flex>
  );
};
export default OvertimeScheduleTable;
