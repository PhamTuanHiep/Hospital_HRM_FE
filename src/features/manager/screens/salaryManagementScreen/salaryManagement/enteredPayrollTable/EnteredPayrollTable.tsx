import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  TableProps,
} from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useEffect, useMemo, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  LeaveHistoryDetail,
  PositionAllowanceDetail,
  UserDetail,
} from "../../../../../../common/common.type";
import {
  AttendanceData,
  SalaryHistoryColumnData,
  SalaryHistoryColumnType,
  SalaryHistoryPost,
} from "../../../../constants/manager.type";
import {
  INIT_LEAVE_HISTORY_DETAIL,
  INIT_POSITION_ALLOWANCE_DETAIL,
  INIT_USER,
} from "../../../../../../common/common.constant";
import {
  getNowMonth,
  getNowYear,
  getNumberOfDaysOffTypes,
} from "../../../../constants/manager.help";
import { SALARY_BASE } from "../../../../constants/manager.constant";
import {
  addSuffix,
  getFormatNumberToString,
} from "../../../../../../common/common.helper";
import {
  getLeaveHistories,
  getPositionAllowances,
  postSalaryHistory,
} from "../../../../../../api/apiServices";

type DataIndex = keyof SalaryHistoryColumnType;
interface TableDataType extends SalaryHistoryColumnData {}
interface EnteredPayrollTableProps {
  setReset: Function;
  reset: Boolean;
  users: UserDetail[];
  attendanceData: AttendanceData[];
}
const EnteredPayrollTable = ({
  setReset,
  reset,
  users,
  attendanceData,
}: EnteredPayrollTableProps) => {
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [leaveHistories, setLeaveHistories] = useState<LeaveHistoryDetail[]>([
    INIT_LEAVE_HISTORY_DETAIL,
  ]);
  const [positionAllowances, setPositionAllowances] = useState<
    PositionAllowanceDetail[]
  >([INIT_POSITION_ALLOWANCE_DETAIL]);

  const fetchPositionAllowances = async () => {
    const res = await getPositionAllowances();
    if (res) {
      setPositionAllowances(res.data.data);
    }
  };

  const fetchLeaveHistories = async () => {
    const res = await getLeaveHistories();
    if (res) {
      setLeaveHistories(res.data.data);
    }
  };

  useEffect(() => {
    fetchPositionAllowances();
    fetchLeaveHistories();
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TableDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const onChange: TableProps<TableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const salaryHistoryTableData = useMemo(() => {
    return attendanceData.map((attendanceDatum, index) => {
      const user =
        users.find((user) => user.userId === attendanceDatum.employeeId) ||
        INIT_USER;
      const { paidLeave, unpaidLeave, numOfDaysOff } = getNumberOfDaysOffTypes(
        leaveHistories,
        user,
        attendanceDatum.annualLeave
      );

      const employeePositionAllowances = positionAllowances.filter(
        (positionAllowance) =>
          positionAllowance.position?.positionId === user.position?.positionId
      ) as PositionAllowanceDetail[];

      //employee's allowance  according to employee's position
      const employeeAllowances = employeePositionAllowances.map(
        (employeePositionAllowance) => {
          return {
            allowanceName: employeePositionAllowance.allowance?.allowanceName,
            allowanceType: employeePositionAllowance.allowance?.allowanceType,
            allowanceRate: employeePositionAllowance.allowance?.allowanceRate,
            allowanceFee: employeePositionAllowance.allowance?.allowanceFee,
          };
        }
      );

      //total allowance for this employee
      const totalEmployeeAllowance = employeeAllowances.reduce(
        (total, currentAllowance) => {
          return (
            total +
            (currentAllowance.allowanceFee || 0) +
            (currentAllowance.allowanceRate || 0) * SALARY_BASE
          );
        },
        0
      );

      //sum paid leave
      const totalPaidLeave =
        paidLeave +
        attendanceDatum.sickLeave +
        attendanceDatum.publicHoliday +
        attendanceDatum.leaveOfAbsence +
        attendanceDatum.compensatoryLeave;

      const employeeSalary =
        (SALARY_BASE *
          (user.position?.salaryCoefficient || 0) *
          (totalPaidLeave + attendanceDatum.attendance) +
          totalEmployeeAllowance) /
          attendanceDatum.standardWorkDays +
        attendanceDatum.bonus;

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
        allowance: totalEmployeeAllowance,
        salary: employeeSalary,
      };
      const nowSalaryData = {
        key: index,
        userId: attendanceDatum.employeeId,
        employeeName: user.fullName,
        departmentName: user.department?.departmentName || "",
        positionName: user.position?.positionName || "",
        time: `${getNowMonth()}/${getNowYear()}`,
        paidLeave: totalPaidLeave,
        unpaidLeave: unpaidLeave + attendanceDatum.unpaidLeave,
        attendance: attendanceDatum.attendance,
        standardWorkDays: attendanceDatum.standardWorkDays,
        bonus: attendanceDatum.bonus,
        allowance: totalEmployeeAllowance,
        salary: employeeSalary,
        actions: salaryHistoryPost,
      };

      return nowSalaryData;
    });
  }, [users, attendanceData, reset, positionAllowances]);

  const SALARY_HISTORY_COLUMNS: TableColumnsType<TableDataType> = [
    {
      title: t("content.salary.UserId"),
      dataIndex: "userId",
      key: "userId",
      width: 80,
      sorter: {
        compare: (a, b) => a.userId - b.userId,
        multiple: 4,
      },
    },
    {
      title: t("content.salary.EmployeeName"),
      dataIndex: "employeeName",
      key: "employeeName",
      width: 150,
      sorter: {
        compare: (a, b) => a.employeeName.localeCompare(b.employeeName),
        multiple: 4,
      },
      ...getColumnSearchProps("employeeName"),
    },
    {
      title: t("content.salary.DepartmentName"),
      dataIndex: "departmentName",
      key: "departmentName",
      width: 150,

      sorter: {
        compare: (a, b) => a.departmentName.localeCompare(b.departmentName),
        multiple: 4,
      },
    },
    {
      title: t("content.salary.PositionName"),
      dataIndex: "positionName",
      key: "positionName",
      width: 130,

      sorter: {
        compare: (a, b) => a.positionName.localeCompare(b.positionName),
        multiple: 3,
      },
      ...getColumnSearchProps("positionName"),
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
      width: 100,
    },
    {
      title: t("content.salary.StandardWorkDays"),
      dataIndex: "standardWorkDays",
      key: "standardWorkDays",
      width: 100,
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

  const handleSubmitSalaryHistory = async (value: SalaryHistoryPost) => {
    const res = await postSalaryHistory(value);
    if (res) {
      setReset(true);
    }
  };

  return (
    <div id="department-management">
      <Table<TableDataType>
        columns={SALARY_HISTORY_COLUMNS}
        dataSource={salaryHistoryTableData}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
        scroll={{ x: "max-content", y: 400 }}
      />
    </div>
  );
};
export default EnteredPayrollTable;
