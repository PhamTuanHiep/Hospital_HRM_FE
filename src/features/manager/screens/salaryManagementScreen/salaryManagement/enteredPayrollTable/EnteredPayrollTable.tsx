import { Button, Flex } from "antd";

import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  AllowanceDetail,
  CommonQueryParams,
  LeaveHistoryDetail,
  OvertimeDetail,
  UserDetail,
} from "../../../../../../common/common.type";
import {
  AttendanceData,
  OvertimeIdsObject,
  SalaryHistoryColumnData,
  SalaryHistoryPost,
} from "../../../../constants/manager.type";
import {
  INIT_ALLOWANCE_DETAIL,
  INIT_LEAVE_HISTORY_DETAIL,
  INIT_OVERTIME,
  INIT_QUERY_PARAMS,
  INIT_USER,
} from "../../../../../../common/common.constant";
import {
  calculateOvertimeCost,
  getNowMonth,
  getNowYear,
  getNumberOfDaysOffTypes,
  isDateInRange,
} from "../../../../constants/manager.help";
import { SALARY_BASE } from "../../../../constants/manager.constant";
import {
  addSuffix,
  getFormatNumberToString,
} from "../../../../../../common/common.helper";
import {
  getAllowances,
  getLeaveHistories,
  getOvertimes,
  postSalaryHistory,
} from "../../../../../../api/apiServices";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";
interface EnteredPayrollTableProps {
  setReset: Function;
  reset: Boolean;
  users: UserDetail[];
  attendanceData: AttendanceData[];
  month: number;
  year: number;
}
const EnteredPayrollTable = ({
  setReset,
  reset,
  users,
  attendanceData,
  month,
  year,
}: EnteredPayrollTableProps) => {
  const { t } = useTranslation();

  const [mockUserQueryParams, setMockUserQueryParams] =
    useState<CommonQueryParams>(INIT_QUERY_PARAMS);

  const [leaveHistories, setLeaveHistories] = useState<LeaveHistoryDetail[]>([
    INIT_LEAVE_HISTORY_DETAIL,
  ]);
  const [allowances, setAllowances] = useState<AllowanceDetail[]>([
    INIT_ALLOWANCE_DETAIL,
  ]);
  const [overtimes, setOvertimes] = useState<OvertimeDetail[]>([INIT_OVERTIME]);

  const fetchAllowances = async () => {
    const res = await getAllowances();
    if (res) {
      setAllowances(res.data.data);
    }
  };

  const fetchOvertimes = async () => {
    const res = await getOvertimes();
    if (res) {
      setOvertimes(res.data.data);
    }
  };

  const fetchLeaveHistories = async () => {
    const res = await getLeaveHistories();
    if (res) {
      setLeaveHistories(res.data.data);
    }
  };

  useEffect(() => {
    fetchAllowances();
    fetchOvertimes();
    fetchLeaveHistories();
  }, []);

  const {
    salaryHistoryTableData,
    numberSalaryHistoryTableData,
  }: {
    salaryHistoryTableData: SalaryHistoryColumnData[];
    numberSalaryHistoryTableData: number;
  } = useMemo(() => {
    const salaryHistoryData = attendanceData.map((attendanceDatum, index) => {
      const user =
        users.find((user) => user.userId === attendanceDatum.employeeId) ||
        INIT_USER;
      const { paidLeave, unpaidLeave, numOfDaysOff } = getNumberOfDaysOffTypes(
        leaveHistories,
        user,
        attendanceDatum.annualLeave
      );

      //overtime
      const filterOvertimeHistories = user.overtimeHistories.filter(
        (overtimeHistory) =>
          isDateInRange(overtimeHistory.startDay, month, year)
      );
      const overtimeIds: OvertimeIdsObject[] = filterOvertimeHistories.map(
        (overtimeHistory) => {
          return {
            overtimeId: overtimeHistory.overtimeId,
          };
        }
      );
      const totalOvertimeCost = calculateOvertimeCost(overtimeIds, overtimes);

      //calculate allowance
      const CURRENT_SALARY = SALARY_BASE * (user.salaryCoefficient || 0);
      //common allowance
      const commonAllowance = allowances.find(
        (allowance) => allowance.allowanceId === "A004"
      );
      const totalCommonAllowance =
        SALARY_BASE * (commonAllowance?.allowanceRate || 0);

      let totalEmployeeAllowance = 0 + totalCommonAllowance;

      // allowance by position
      const positionAllowanceId =
        user.department?.allowanceRelationship?.allowance.allowanceId;
      const departmentAllowanceId =
        user.position?.allowanceRelationship?.allowance.allowanceId;
      if (positionAllowanceId) {
        const positionAllowance = allowances.find(
          (allowance) => allowance.allowanceId === positionAllowanceId
        );
        const totalPositionAllowance =
          CURRENT_SALARY * (positionAllowance?.allowanceRate || 0) +
          (positionAllowance?.allowanceFee || 0);
        totalEmployeeAllowance =
          totalEmployeeAllowance + totalPositionAllowance;
      }
      // allowance by department
      if (departmentAllowanceId) {
        const departmentAllowance = allowances.find(
          (allowance) => allowance.allowanceId === departmentAllowanceId
        );
        const totalDepartmentAllowance =
          SALARY_BASE * (departmentAllowance?.allowanceRate || 0) +
          (departmentAllowance?.allowanceFee || 0);
        totalEmployeeAllowance =
          totalEmployeeAllowance + totalDepartmentAllowance;
      }
      //sum paid leave
      const totalPaidLeave =
        paidLeave +
        attendanceDatum.sickLeave +
        attendanceDatum.publicHoliday +
        attendanceDatum.leaveOfAbsence +
        attendanceDatum.compensatoryLeave;

      const employeeSalary =
        (SALARY_BASE *
          (user.salaryCoefficient || 0) *
          (totalPaidLeave + attendanceDatum.attendance) +
          totalEmployeeAllowance) /
          attendanceDatum.standardWorkDays +
        attendanceDatum.bonus +
        totalOvertimeCost;

      const salaryHistoryPost = {
        userId: attendanceDatum.employeeId,
        month: getNowMonth(),
        year: getNowYear(),
        attendance: attendanceDatum.attendance,
        paidLeave: totalPaidLeave,
        unpaidLeave: unpaidLeave + attendanceDatum.unpaidLeave,
        numOfDaysOff: numOfDaysOff,
        standardWorkDays: attendanceDatum.standardWorkDays,
        bonus: attendanceDatum.bonus,
        overtimeCost: totalOvertimeCost,
        allowance: totalEmployeeAllowance,
        salary: employeeSalary,
      };
      const nowSalaryData = {
        rowId: index,
        userId: attendanceDatum.employeeId,
        employeeName: user.fullName,
        departmentName: user.department?.departmentName || "",
        positionName: user.position?.positionName || "",
        time: `${month}/${year}`,
        paidLeave: totalPaidLeave,
        unpaidLeave: unpaidLeave + attendanceDatum.unpaidLeave,
        attendance: attendanceDatum.attendance,
        standardWorkDays: attendanceDatum.standardWorkDays,
        bonus: attendanceDatum.bonus,
        overtimeCost: totalOvertimeCost,
        allowance: totalEmployeeAllowance,
        salary: employeeSalary,
        actions: salaryHistoryPost,
      };
      return nowSalaryData;
    });
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    setMockUserQueryParams({
      ...mockUserQueryParams,
      page: currentPage,
      items_per_page: itemPerPage,
    });
    return {
      salaryHistoryTableData: salaryHistoryData,
      numberSalaryHistoryTableData: salaryHistoryData.length,
    };
  }, [users, attendanceData, reset, leaveHistories, allowances]);

  const SALARY_HISTORY_COLUMNS: ColumnDataCustom<SalaryHistoryColumnData>[] = [
    {
      title: t("content.salary.UserId"),
      dataIndex: "userId",
      key: "userId",
      width: 150,
      prioritySort: 5,
    },
    {
      title: t("content.salary.EmployeeName"),
      dataIndex: "employeeName",
      key: "employeeName",
      prioritySort: 4,
      isSearch: true,
    },
    {
      title: t("content.salary.DepartmentName"),
      dataIndex: "departmentName",
      key: "departmentName",
      width: 150,
      prioritySort: 6,
    },
    {
      title: t("content.salary.PositionName"),
      dataIndex: "positionName",
      key: "positionName",
      width: 130,
      prioritySort: 3,
      isSearch: true,
    },
    {
      title: t("content.salary.MonthlySalary"),
      dataIndex: "time",
      key: "time",
      width: 150,
    },
    {
      title: t("content.salary.PaidLeave"),
      dataIndex: "paidLeave",
      key: "paidLeave",
      width: 150,
    },
    {
      title: t("content.salary.UnpaidLeave"),
      dataIndex: "unpaidLeave",
      key: "unpaidLeave",
      width: 150,
    },
    {
      title: t("content.salary.Attendance"),
      dataIndex: "attendance",
      key: "attendance",
      width: 150,
    },
    {
      title: t("content.salary.StandardWorkDays"),
      dataIndex: "standardWorkDays",
      key: "standardWorkDays",
      width: 150,
    },
    {
      title: t("content.salary.Bonus"),
      dataIndex: "bonus",
      key: "bonus",
      width: 140,
      render: (value) =>
        addSuffix(getFormatNumberToString(Math.round(value), ","), "VND"),
    },
    {
      title: t("content.salary.OvertimeCost"),
      dataIndex: "overtimeCost",
      key: "overtimeCost",
      width: 140,
      render: (value) =>
        addSuffix(getFormatNumberToString(Math.round(value), ","), "VND"),
    },
    {
      title: t("content.salary.Allowance"),
      dataIndex: "allowance",
      key: "allowance",
      width: 140,
      render: (value) =>
        addSuffix(getFormatNumberToString(Math.round(value), ","), "VND"),
    },

    {
      title: t("content.salary.Salary"),
      dataIndex: "salary",
      key: "salary",
      width: 140,
      render: (value) =>
        addSuffix(getFormatNumberToString(Math.round(value), ","), "VND"),
    },
    {
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button
              onClick={() => handleSubmitSalaryHistory(value)}
              type="primary"
            >
              {t("content.common.Submit")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const { customNonContractedEmployeeData } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    const startIndex = itemPerPage * (currentPage - 1);
    const endIndex = itemPerPage * currentPage - 1;

    return {
      customNonContractedEmployeeData: salaryHistoryTableData.slice(
        startIndex,
        endIndex + 1
      ),
    };
  }, [salaryHistoryTableData, mockUserQueryParams]);

  const handleSubmitSalaryHistory = async (value: SalaryHistoryPost) => {
    console.log("value:", value);
    const res = await postSalaryHistory(value);
    if (res) {
      setReset(true);
    }
  };

  return (
    <div id="department-management">
      <TableComponent<SalaryHistoryColumnData>
        tableData={salaryHistoryTableData}
        columnData={SALARY_HISTORY_COLUMNS}
        itemTotal={numberSalaryHistoryTableData}
        paginationQueryParams={mockUserQueryParams}
        setPaginationQueryParams={setMockUserQueryParams}
        loading={!customNonContractedEmployeeData}
      />
    </div>
  );
};
export default EnteredPayrollTable;
