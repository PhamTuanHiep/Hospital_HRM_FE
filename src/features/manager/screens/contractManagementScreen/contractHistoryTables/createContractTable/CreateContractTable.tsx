import { useTranslation } from "react-i18next";
import {
  ContractStatus,
  INIT_CONTRACT_HISTORY,
  INIT_QUERY_PARAMS,
  INIT_USER,
} from "../../../../../../common/common.constant";
import {
  CommonQueryParams,
  ContractHistoryDetail,
  UserDetail,
  UsersQueryParams,
} from "../../../../../../common/common.type";
import { useEffect, useMemo, useState } from "react";
import {
  getContractHistories,
  getUsers,
} from "../../../../../../api/apiServices";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";
import { NonContractedEmployee } from "../../../../constants/manager.type";
import { formatDateToDDMMYYYY } from "../../../../../../common/common.helper";
import { Button, Card, Flex } from "antd";
import CustomBreadcrumb from "../../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../../constants/constant.path";
import CreateContractHistoryModel from "./createContractHistoryModel/CreateContractHistoryModel";

const CreateContractTable = () => {
  const { t } = useTranslation();

  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);

  const [employees, setEmployees] = useState<UserDetail[]>([INIT_USER]);
  const [employee, setEmployee] = useState<UserDetail>(INIT_USER);

  const [reset, setReset] = useState<boolean>(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const userQueryParams: UsersQueryParams = {
    // roleId: "admin",
  };

  const [mockUserQueryParams, setMockUserQueryParams] =
    useState<CommonQueryParams>(INIT_QUERY_PARAMS);

  const fetchEmployees = async () => {
    const res = await getUsers(userQueryParams);
    console.log("res:", res);
    if (res) {
      const { data: employeesApi } = res.data;

      setEmployees(employeesApi);
      console.log("res.data.data:", res.data.data);
    }
  };

  const fetchContractHistories = async () => {
    const res = await getContractHistories();
    if (res) {
      const { data: contractHistoriesApi } = res.data;

      setContractHistories(contractHistoriesApi);
    }
  };
  useEffect(() => {
    fetchEmployees();
    fetchContractHistories();
  }, [reset]);

  const nonContractedEmployeeColumns: ColumnDataCustom<NonContractedEmployee>[] =
    [
      {
        title: t("content.salary.UserId"),
        dataIndex: "userId",
        width: 150,
        prioritySort: 1,
        render: (value: string, record: NonContractedEmployee) => {
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
                    onClick={() => handleCreateContractHistory(value)}
                  >
                    Lập hợp đồng
                    {/* {t("content.common.Update")} */}
                  </Button>
                </Flex>
              }
            </div>
          );
        },
      },
    ];
  const invalidContractStatuses = [
    ContractStatus.ACTIVE,
    ContractStatus.RENEWAL_PENDING,
    ContractStatus.SUSPENDED,
    ContractStatus.TRANSFERRED,
  ];

  const { nonContractedEmployeeData, nonContractedEmployeeTotal } =
    useMemo(() => {
      const employeesDoNotNeedToHaveContracts = contractHistories.filter(
        (contractHistory) =>
          invalidContractStatuses.includes(contractHistory.status)
      );
      console.log(
        "employeesDoNotNeedToHaveContracts:",
        employeesDoNotNeedToHaveContracts
      );
      const employeesNeedToHaveContracts = employees.filter((employee) => {
        return !employeesDoNotNeedToHaveContracts.some(
          (employeesDoNotNeedToHaveContract) => {
            return (
              employeesDoNotNeedToHaveContract.user.userId === employee.userId
            );
          }
        );
      });
      const itemPerPage = mockUserQueryParams.items_per_page || 1;
      const currentPage = mockUserQueryParams.page || 1;
      setMockUserQueryParams({
        ...mockUserQueryParams,
        page: currentPage,
        items_per_page: itemPerPage,
      });
      console.log(
        "employeesNeedToHaveContracts:",
        employeesNeedToHaveContracts
      );
      return {
        nonContractedEmployeeData: employeesNeedToHaveContracts.map(
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
        nonContractedEmployeeTotal: employeesNeedToHaveContracts.length || 0,
      };
    }, [employees, contractHistories]);

  const { customNonContractedEmployeeData } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    const startIndex = itemPerPage * (currentPage - 1);
    const endIndex = itemPerPage * currentPage - 1;

    return {
      customNonContractedEmployeeData: nonContractedEmployeeData.slice(
        startIndex,
        endIndex + 1
      ),
    };
  }, [nonContractedEmployeeData, mockUserQueryParams]);

  const handleCreateContractHistory = (employee: UserDetail) => {
    setEmployee(employee);
    setIsCreateModalOpen(true);
  };

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={managerPaths.CONTRACT_MANAGEMENT}>
                  {t("content.contract.ContractManagement")}
                </a>
              </div>
            ),
          },
          {
            title: <span> {t("content.contract.AddContractHistory")}</span>,
            menu: {
              items: [
                {
                  key: "1",
                  label: (
                    <a href={`${managerPaths.CONTRACT_MANAGEMENT}`}>
                      {t("content.contract.SignedContract")}
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a
                      href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.ADD_CONTRACT}`}
                    >
                      {t("content.contract.AddContractHistory")}
                    </a>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <a
                      href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.CANCELLED_CONTRACT}`}
                    >
                      {t("content.contract.CancelledContract")}
                    </a>
                  ),
                },
              ],
            },
          },
        ]}
      />
      <Card title="Danh sách nhân viên chưa lập hợp đồng">
        <TableComponent<NonContractedEmployee>
          tableData={customNonContractedEmployeeData}
          columnData={nonContractedEmployeeColumns}
          itemTotal={nonContractedEmployeeTotal}
          paginationQueryParams={mockUserQueryParams}
          setPaginationQueryParams={setMockUserQueryParams}
          loading={!customNonContractedEmployeeData}
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

export default CreateContractTable;
