import { Button, Card, Flex, List, Tag } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  PageResponse,
  UserDetail,
  UsersQueryParams,
} from "../../../../common/common.type";
import {
  GenderId,
  GenderName,
  INIT_PAGE_RESPONSE,
  INIT_USER,
  QueryParamsWithListPosts,
  userStatus,
  UserStatus,
} from "../../../../common/common.constant";
import { getUsers } from "../../../../api/apiServices";
import { EmployeeWorkColumnType } from "../../constants/manager.type";

import dayjs from "dayjs";
import {
  filterDepartmentOptions,
  filterPositionOptions,
  getAverageScoreToObject,
} from "../../constants/manager.help";
import { useAppSelector } from "../../../../app/hooks";
import UpdateEmployeeModal from "./updateEmployeeWorkModal/UpdateEmployeeModal";
import { getDayNameFromNumber } from "../../../../common/common.helper";
import EvaluateEmployeeModal from "./evaluateEmployeeWorkModal/EvaluateEmployeeModal";
import { useTranslation } from "react-i18next";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../components/tableComponent/TableComponent";
import CustomBreadcrumb from "../../../../components/customBreadcrumb/CustomBreadcrumb";
import { managerPaths } from "../../constants/constant.path";

const EmployeeWorkManagementScreen = () => {
  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );
  const { t } = useTranslation();

  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [queryParams, setQueryParams] = useState<UsersQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
    // roleId: currentAccount.role?.roleId,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEvaluateModalOpen, setIsEvaluateModalOpen] = useState(false);

  const [reset, setReset] = useState(false);
  const [employees, setEmployees] = useState<UserDetail[]>([INIT_USER]);
  const [employee, setEmployee] = useState<UserDetail>(INIT_USER);

  const fetchUsers = useCallback(async () => {
    const res = await getUsers(queryParams);
    if (res) {
      const { data: employeesApi, ...pageResponse } = res.data;
      setEmployees(employeesApi);
      setCustomPageParam(pageResponse);
      setReset(false);
    }
  }, [queryParams]);

  const employeesData: EmployeeWorkColumnType[] = useMemo(() => {
    return employees.map((employee) => {
      return {
        rowId: employee.userId,
        email: employee.account?.email || "",
        fullName: employee.fullName,
        gender: employee.gender,
        departmentName: employee.department?.departmentName || "",
        salaryCoefficient: employee.salaryCoefficient,
        positionName: employee.position?.positionName || "",
        weeklySchedule: employee.weeklySchedule || [],
        averageScore: getAverageScoreToObject(employee).map((object) => {
          return (
            <List.Item>
              <Tag>
                Năm {object.year}: {object.averageScore ?? "Chưa có đánh giá"}
              </Tag>
            </List.Item>
          );
        }),
        status: employee.status || "",
        createdAt: dayjs(employee.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(employee.updatedAt).format("DD-MM-YYYY") || "",
        actions: employee,
      };
    });
  }, [employees]);

  console.log("employees:", employees);
  console.log("employeesData:", employeesData);
  const EMPLOYEE_COLUMNS: ColumnDataCustom<EmployeeWorkColumnType>[] = [
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
      title: t("content.info.SalaryCoefficient"),
      dataIndex: "salaryCoefficient",
      key: "salaryCoefficient",
      width: 100,
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
      title: t("content.info.WeeklySchedule"),
      dataIndex: "weeklySchedule",
      key: "weeklySchedule",
      width: 220,
      render: (value) => getDayNameFromNumber(value),
    },
    {
      title: t("content.info.AverageScore"),
      dataIndex: "averageScore",
      key: "averageScore",
      width: 220,
    },
    {
      title: t("content.info.Status"),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (value) => userStatus[value as UserStatus],
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
              onClick={() => handleUpdateEmployee(value)}
              type="primary"
              className="btn-wide"
            >
              {t("content.employee.Update")}
            </Button>
            <Button
              onClick={() => handleEvaluateEmployee(value)}
              type="primary"
              // style={{ width: "130px", whiteSpace: "normal", height: "46px" }}
              className="btn-wide"
            >
              {t("content.common.BtnEvaluate")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const handleUpdateEmployee = (value: UserDetail) => {
    setEmployee(value);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleEvaluateEmployee = (value: UserDetail) => {
    setEmployee(value);
    setIsEvaluateModalOpen(true);
    setReset(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [reset, fetchUsers]);

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.EMPLOYEE_WORK_MANAGEMENT}`}>
                  {t("content.feature.EmployeeManagement")}
                </a>
              </div>
            ),
          },
        ]}
      />

      <Flex vertical gap={12}>
        <Card
          id="employee-table"
          title={t("content.employee.ManageEmployeesTitle")}
        >
          <TableComponent<EmployeeWorkColumnType>
            columnData={EMPLOYEE_COLUMNS}
            tableData={employeesData}
            itemTotal={customPageParam.total}
            paginationQueryParams={queryParams}
            setPaginationQueryParams={setQueryParams}
          />
        </Card>
      </Flex>
      <UpdateEmployeeModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        employee={employee}
        confirmLoading={!employee}
      />
      <EvaluateEmployeeModal
        isModalOpen={isEvaluateModalOpen}
        setIsModalOpen={setIsEvaluateModalOpen}
        setReset={setReset}
        employee={employee}
        confirmLoading={!employee}
      />
    </div>
  );
};
export default EmployeeWorkManagementScreen;
