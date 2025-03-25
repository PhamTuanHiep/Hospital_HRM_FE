import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  CommonQueryParams,
  UserDetail,
} from "../../../../../../common/common.type";
import { UnPaidPayrollColumnData } from "../../../../constants/manager.type";
import { INIT_QUERY_PARAMS } from "../../../../../../common/common.constant";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";

interface UnpaidPayrollTableProps {
  users: UserDetail[];
}
const UnpaidPayrollTable = ({ users }: UnpaidPayrollTableProps) => {
  const { t } = useTranslation();
  const [mockUserQueryParams, setMockUserQueryParams] =
    useState<CommonQueryParams>(INIT_QUERY_PARAMS);

  const {
    paidPayroll,
    numPaidPayroll,
  }: { paidPayroll: UnPaidPayrollColumnData[]; numPaidPayroll: number } =
    useMemo(() => {
      const newPaidPayroll = users.map((user, index) => {
        return {
          rowId: index,
          userId: user.userId,
          employeeName: user.fullName,
          departmentName: user.department?.departmentName || "",
          positionName: user.position?.positionName || "",
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
    }, [users]);

  const { paidPayrollData } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    const startIndex = itemPerPage * (currentPage - 1);
    const endIndex = itemPerPage * currentPage - 1;

    return {
      paidPayrollData: paidPayroll.slice(startIndex, endIndex + 1),
    };
  }, [paidPayroll, mockUserQueryParams]);

  const PAID_PAYROLL_COLUMNS: ColumnDataCustom<UnPaidPayrollColumnData>[] = [
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
  ];

  return (
    <div id="department-management">
      <TableComponent<UnPaidPayrollColumnData>
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
export default UnpaidPayrollTable;
