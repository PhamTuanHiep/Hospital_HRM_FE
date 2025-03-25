import { useTranslation } from "react-i18next";
import {
  PageResponse,
  UserDetail,
  UsersQueryParams,
} from "../../../../../../common/common.type";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GenderId,
  GenderName,
  INIT_PAGE_RESPONSE,
  INIT_USER,
  QueryParamsWithListPosts,
  UserStatus,
} from "../../../../../../common/common.constant";
import { getUsers, putUser } from "../../../../../../api/apiServices";
import { EmployeeTrainingColumnType } from "../../../../constants/manager.type";
import {
  filterDepartmentOptions,
  filterPositionOptions,
} from "../../../../constants/manager.help";
import { Button, Card, Flex } from "antd";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";
import dayjs from "dayjs";

interface EmployeesWorkingTableProps {
  reset: boolean;
  setReset: Function;
}
const EmployeesWorkingTable = ({
  reset,
  setReset,
}: EmployeesWorkingTableProps) => {
  const { t } = useTranslation();

  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [employeesWorkingQueryParams, setEmployeesWorkingQueryParams] =
    useState<UsersQueryParams>({
      page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
      items_per_page: QueryParamsWithListPosts.PER_PAGE,
      userStatus: UserStatus.WORKING,
    });

  const [employeesWorking, setEmployeesWorking] = useState<UserDetail[]>([
    INIT_USER,
  ]);

  const fetchEmployeesTraining = useCallback(async () => {
    const res = await getUsers(employeesWorkingQueryParams);
    if (res) {
      const { data: employeesApi, ...pageResponse } = res.data;
      setEmployeesWorking(employeesApi);
      setCustomPageParam(pageResponse);
      setReset(false);
    }
  }, [employeesWorkingQueryParams, setReset]);

  const employeesData: EmployeeTrainingColumnType[] = useMemo(() => {
    // setReset(false);
    return employeesWorking.map((employeeWorking) => {
      return {
        rowId: employeeWorking.userId,
        email: employeeWorking.account?.email || "",
        fullName: employeeWorking.fullName,
        gender: employeeWorking.gender || 1,
        departmentName: employeeWorking.department?.departmentName || "",
        positionName: employeeWorking.position?.positionName || "",
        createdAt: dayjs(employeeWorking.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(employeeWorking.updatedAt).format("DD-MM-YYYY") || "",
        actions: employeeWorking,
      };
    });
  }, [employeesWorking, reset]);

  const EMPLOYEE_COLUMNS: ColumnDataCustom<EmployeeTrainingColumnType>[] = [
    {
      title: t("content.info.FullName"),
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      prioritySort: 6,
      isSearch: true,
    },
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      key: "email",
      width: 100,
      prioritySort: 5,
    },
    {
      title: t("content.info.Gender"),
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (value) => {
        return value === GenderId.MALE
          ? t(`content.common.${GenderName.MALE}`)
          : t(`content.common.${GenderName.FEMALE}`);
      },
    },
    {
      title: t("content.info.DepartmentName"),
      dataIndex: "departmentName",
      key: "departmentName",
      width: 200,
      prioritySort: 4,
      filterObjects: filterDepartmentOptions,
    },
    {
      title: t("content.info.PositionName"),
      dataIndex: "positionName",
      key: "positionName",
      width: 130,
      prioritySort: 3,
      filterObjects: filterPositionOptions,
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
      prioritySort: 2,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 130,
      prioritySort: 1,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" align="center" gap={8}>
            <Button
              onClick={() => handleJoinTraining(value)}
              type="primary"
              className="btn-wide"
            >
              {t("content.recruitmentPost.JoinTraining")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const handleJoinTraining = async (value: UserDetail) => {
    console.log("value-EmployeesWorkingTable:", value);
    const res = await putUser(value.userId, {
      status: UserStatus.CURRENTLY_IN_TRAINING,
    });
    if (res) {
      setReset(true);
    } else {
      console.log("employee joined training fail!");
    }
  };

  useEffect(() => {
    fetchEmployeesTraining();
  }, [reset, fetchEmployeesTraining]);

  return (
    <Card title="Nhân viên chưa tham gia đào tạo">
      <TableComponent<EmployeeTrainingColumnType>
        columnData={EMPLOYEE_COLUMNS}
        tableData={employeesData}
        itemTotal={customPageParam.total}
        paginationQueryParams={employeesWorkingQueryParams}
        setPaginationQueryParams={setEmployeesWorkingQueryParams}
      />
    </Card>
  );
};
export default EmployeesWorkingTable;
