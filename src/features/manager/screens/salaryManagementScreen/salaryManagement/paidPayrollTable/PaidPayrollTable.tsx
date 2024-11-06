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
import { useMemo, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  SalaryHistoryDetail,
  SalaryHistoryShortInfo,
  UserDetail,
} from "../../../../../../common/common.type";
import { PaidPayrollColumnData } from "../../../../constants/manager.type";
import { INIT_SALARY_HISTORY } from "../../../../../../common/common.constant";
import { getNowMonth, getNowYear } from "../../../../constants/manager.help";
import {
  addSuffix,
  getFormatNumberToString,
} from "../../../../../../common/common.helper";
import { deleteSalaryHistory } from "../../../../../../api/apiServices";

type DataIndex = keyof PaidPayrollColumnData;
interface TableDataType extends PaidPayrollColumnData {}
interface PaidPayrollTableProps {
  setReset: Function;
  reset: Boolean;
  users: UserDetail[];
}
const PaidPayrollTable = ({
  setReset,
  reset,
  users,
}: PaidPayrollTableProps) => {
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");

  const [salaryHistories, setSalaryHistories] = useState<SalaryHistoryDetail[]>(
    [INIT_SALARY_HISTORY]
  );

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

  const paidPayroll = useMemo(() => {
    return users.map((user, index) => {
      const salaryHistory = user.salaryHistories.find((salaryHistory) => {
        return (
          salaryHistory.month === getNowMonth() &&
          salaryHistory.year === getNowYear()
        );
      });
      return {
        key: index,
        userId: user.userId,
        employeeName: user.fullName,
        departmentName: user.department?.departmentName || "",

        positionName: user.position?.positionName || "",
        // month: getNowMonth(),
        // year: getNowYear(),
        time: `${salaryHistory?.month}/${salaryHistory?.year}` || "",
        paidLeave: salaryHistory?.paidLeave || 0,
        unpaidLeave: salaryHistory?.unpaidLeave || 0,
        attendance: salaryHistory?.attendance || 0,
        standardWorkDays: salaryHistory?.standardWorkDays || 0,
        bonus: salaryHistory?.bonus || 0,
        allowance: salaryHistory?.allowance || 0,
        salary: salaryHistory?.salary || 0,
        actions: salaryHistory || INIT_SALARY_HISTORY,
      };
    });
  }, [users, salaryHistories, reset]);
  const PAID_PAYROLL_COLUMNS: TableColumnsType<TableDataType> = [
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
      width: 130,

      sorter: {
        compare: (a, b) => a.employeeName.localeCompare(b.employeeName),
        multiple: 4,
      },
    },
    {
      title: t("content.salary.DepartmentName"),
      dataIndex: "departmentName",
      key: "departmentName",
      width: 130,

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
      width: 100,
    },
    {
      title: t("content.salary.PaidLeave"),
      dataIndex: "paidLeave",
      key: "paidLeave",
      width: 100,
    },
    {
      title: t("content.salary.UnpaidLeave"),
      dataIndex: "unpaidLeave",
      key: "unpaidLeave",
      width: 100,
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
      width: 150,
    },
    {
      title: t("content.salary.Allowance"),
      dataIndex: "allowance",
      key: "allowance",
      width: 150,
    },
    {
      title: t("content.salary.Salary"),
      dataIndex: "salary",
      key: "salary",
      width: 150,
      render: (value) =>
        addSuffix(getFormatNumberToString(Math.round(value), ","), "vnd"),
    },
    {
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button
              onClick={() => handleDeleteSalaryHistory(value)}
              type="primary"
              danger
            >
              {t("content.common.Delete")}
            </Button>
          </Flex>
        );
      },
    },
  ];
  setSalaryHistories;

  const handleDeleteSalaryHistory = async (value: SalaryHistoryShortInfo) => {
    const res = await deleteSalaryHistory(value.salaryHistoryId);
    if (res) {
      setReset(true);
    }
  };

  return (
    <div id="department-management">
      <Table<TableDataType>
        columns={PAID_PAYROLL_COLUMNS}
        dataSource={paidPayroll}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
        scroll={{ x: "max-content", y: 400 }}
      />
    </div>
  );
};
export default PaidPayrollTable;