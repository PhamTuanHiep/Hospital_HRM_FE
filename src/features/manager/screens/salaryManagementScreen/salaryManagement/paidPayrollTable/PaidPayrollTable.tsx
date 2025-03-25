import { Button, Flex } from "antd";

import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  CommonQueryParams,
  SalaryHistoryShortInfo,
  UserDetail,
} from "../../../../../../common/common.type";
import { PaidPayrollColumnData } from "../../../../constants/manager.type";
import {
  INIT_QUERY_PARAMS,
  INIT_SALARY_HISTORY,
} from "../../../../../../common/common.constant";
import { getNowMonth, getNowYear } from "../../../../constants/manager.help";
import {
  addSuffix,
  getFormatNumberToString,
} from "../../../../../../common/common.helper";
import { deleteSalaryHistory } from "../../../../../../api/apiServices";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";

interface PaidPayrollTableProps {
  setReset: Function;
  reset: boolean;
  users: UserDetail[];
}
const PaidPayrollTable = ({
  setReset,
  reset,
  users,
}: PaidPayrollTableProps) => {
  const { t } = useTranslation();

  const [mockUserQueryParams, setMockUserQueryParams] =
    useState<CommonQueryParams>(INIT_QUERY_PARAMS);

  const {
    paidPayroll,
    numPaidPayroll,
  }: { paidPayroll: PaidPayrollColumnData[]; numPaidPayroll: number } =
    useMemo(() => {
      const newPaidPayroll = users.map((user, index) => {
        const salaryHistory = user.salaryHistories.find((salaryHistory) => {
          return (
            salaryHistory.month === getNowMonth() &&
            salaryHistory.year === getNowYear()
          );
        });
        return {
          rowId: index,
          userId: user.userId,
          employeeName: user.fullName,
          departmentName: user.department?.departmentName || "",
          positionName: user.position?.positionName || "",
          time: `${salaryHistory?.month}/${salaryHistory?.year}`,
          paidLeave: salaryHistory?.paidLeave || 0,
          unpaidLeave: salaryHistory?.unpaidLeave || 0,
          attendance: salaryHistory?.attendance || 0,
          standardWorkDays: salaryHistory?.standardWorkDays || 0,
          bonus: salaryHistory?.bonus || 0,
          allowance: salaryHistory?.allowance || 0,
          overtimeCost: salaryHistory?.overtimeCost || 0,
          salary: salaryHistory?.salary || 0,
          actions: salaryHistory || INIT_SALARY_HISTORY,
        };
      });
      const itemPerPage = mockUserQueryParams.items_per_page || 1;
      const currentPage = mockUserQueryParams.page || 1;
      setMockUserQueryParams({
        ...mockUserQueryParams,
        page: currentPage,
        items_per_page: itemPerPage,
      });

      return {
        paidPayroll: newPaidPayroll,
        numPaidPayroll: newPaidPayroll.length,
      };
    }, [users, reset]);

  const { paidPayrollData } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    const startIndex = itemPerPage * (currentPage - 1);
    const endIndex = itemPerPage * currentPage - 1;

    return {
      paidPayrollData: paidPayroll.slice(startIndex, endIndex + 1),
    };
  }, [paidPayroll, mockUserQueryParams]);

  const PAID_PAYROLL_COLUMNS: ColumnDataCustom<PaidPayrollColumnData>[] = [
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
      width: 150,
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

  const handleDeleteSalaryHistory = async (value: SalaryHistoryShortInfo) => {
    const res = await deleteSalaryHistory(value.salaryHistoryId);
    if (res) {
      setReset(true);
    }
  };

  return (
    <div id="department-management">
      <TableComponent<PaidPayrollColumnData>
        tableData={paidPayrollData}
        columnData={PAID_PAYROLL_COLUMNS}
        itemTotal={numPaidPayroll}
        paginationQueryParams={mockUserQueryParams}
        setPaginationQueryParams={setMockUserQueryParams}
        loading={!paidPayrollData}
      />
    </div>
  );
};
export default PaidPayrollTable;
