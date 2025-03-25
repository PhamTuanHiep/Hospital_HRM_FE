import { useTranslation } from "react-i18next";

import { Button, Card, Flex } from "antd";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  CommonQueryParams,
  UserDetail,
} from "../../../../../common/common.type";
import {
  INIT_QUERY_PARAMS,
  INIT_USER,
} from "../../../../../common/common.constant";
import { getUsers } from "../../../../../api/apiServices";
import { EmployeeNotHaveAccountColumns } from "../../../constants/manager.type";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";
import { formatDateToDDMMYYYY } from "../../../../../common/common.helper";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";
import CreateContractHistoryModel from "./createAccountModel/CreateAccountModel";

const CreateAccountScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<UserDetail[]>([INIT_USER]);
  const [employee, setEmployee] = useState<UserDetail>(INIT_USER);

  const [reset, setReset] = useState<boolean>(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [mockUserQueryParams, setMockUserQueryParams] =
    useState<CommonQueryParams>(INIT_QUERY_PARAMS);

  const fetchEmployees = async () => {
    const res = await getUsers();

    if (res) {
      const { data: employeesApi } = res.data;
      setEmployees(employeesApi);
      setReset(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [reset]);

  const employeeNotHaveAccountColumns: ColumnDataCustom<EmployeeNotHaveAccountColumns>[] =
    [
      {
        title: t("content.salary.UserId"),
        dataIndex: "userId",
        width: 150,
        prioritySort: 1,
        render: (value: string, record: EmployeeNotHaveAccountColumns) => {
          return <div>{value}</div>;
        },
      },
      {
        title: t("content.info.FullName"),
        dataIndex: "fullName",
        width: 200,
        prioritySort: 2,
      },
      {
        title: t("content.info.Gender"),
        dataIndex: "gender",
      },
      {
        title: t("content.info.DepartmentName"),
        dataIndex: "departmentName",
      },
      {
        title: t("content.info.PositionName"),
        dataIndex: "positionName",
      },
      {
        title: t("content.common.CreatedAt"),
        dataIndex: "createdAt",
        width: 150,
        render: (value: Date) => <div>{formatDateToDDMMYYYY(value)}</div>,
      },
      {
        title: t("content.common.UpdatedAt"),
        dataIndex: "updatedAt",
        width: 150,
        render: (value: Date) => <div>{formatDateToDDMMYYYY(value)}</div>,
      },
      {
        dataIndex: "actions",
        className: "title_content-center",
        render: (value: UserDetail) => {
          return (
            <div>
              {
                <Flex justify="space-between" gap={8} className="actions">
                  <Button
                    type="primary"
                    onClick={() => handleCreateAccount(value)}
                  >
                    {t("content.account.CreateAccount")}
                  </Button>
                </Flex>
              }
            </div>
          );
        },
      },
    ];

  const {
    employeeNotHaveAccountColumnsData,
    employeeNotHaveAccountColumnsTotal,
  } = useMemo(() => {
    const employeeNotHaveAccountData = employees.filter(
      (employee) => employee.account === null
    );
    // console.log("employeeNotHaveAccountData:", employeeNotHaveAccountData);

    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    setMockUserQueryParams({
      ...mockUserQueryParams,
      page: currentPage,
      items_per_page: itemPerPage,
    });
    return {
      employeeNotHaveAccountColumnsData: employeeNotHaveAccountData.map(
        (employee) => {
          //
          return {
            rowId: employee.userId,
            userId: employee.userId,
            fullName: employee.fullName,
            gender: employee.gender,
            departmentName: employee.department?.departmentName || "-",
            positionName: employee.position?.positionName || "-",
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
            actions: employee,
          };
        }
      ),
      employeeNotHaveAccountColumnsTotal:
        employeeNotHaveAccountData.length || 0,
    };
  }, [employees]);

  const { customEmployeeNotHaveAccountColumnsData } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    const startIndex = itemPerPage * (currentPage - 1);
    const endIndex = itemPerPage * currentPage - 1;

    return {
      customEmployeeNotHaveAccountColumnsData:
        employeeNotHaveAccountColumnsData.slice(startIndex, endIndex + 1),
    };
  }, [employeeNotHaveAccountColumnsData, mockUserQueryParams]);

  const handleCreateAccount = (employee: UserDetail) => {
    setEmployee(employee);
    setIsCreateModalOpen(true);
  };

  const handleNavigationBackAccountManagementScreen = () => {
    navigate(-1);
  };

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.ACCOUNT_MANAGEMENT}`}>
                  {t("content.feature.AccountManagement")}
                </a>
              </div>
            ),
          },
          {
            title: (
              <div>
                <a
                  href={`${managerPaths.ACCOUNT_MANAGEMENT}/${managerChildPaths.ADD_ACCOUNT}`}
                >
                  {t("content.account.CreateAccount")}
                </a>
              </div>
            ),
          },
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => handleNavigationBackAccountManagementScreen()}
          >
            {t("content.common.Back")}
          </Button>
        }
      />
      <Card title={t("content.account.CreateAccount")}>
        <TableComponent<EmployeeNotHaveAccountColumns>
          tableData={customEmployeeNotHaveAccountColumnsData}
          columnData={employeeNotHaveAccountColumns}
          itemTotal={employeeNotHaveAccountColumnsTotal}
          paginationQueryParams={mockUserQueryParams}
          setPaginationQueryParams={setMockUserQueryParams}
          loading={!customEmployeeNotHaveAccountColumnsData}
        />
      </Card>
      <CreateContractHistoryModel
        modalKey={employee.userId}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        setReset={setReset}
        confirmLoading={employee.userId > 0}
        employee={employee}
      />
    </div>
  );
};

export default CreateAccountScreen;
