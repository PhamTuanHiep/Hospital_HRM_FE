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

const AddContractTable = () => {
  const { t } = useTranslation();
  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);
  const [employees, setEmployee] = useState<UserDetail[]>([INIT_USER]);
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

      setEmployee(employeesApi);
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
  }, []);

  const nonContractedEmployeeColumns: ColumnDataCustom<NonContractedEmployee>[] =
    [
      {
        title: t("content.salary.UserId"),
        dataIndex: "userId",
        width: 150,
        isSorter: true,
        render: (value: string, record: NonContractedEmployee) => {
          return <div>{value}</div>;
        },
      },
      {
        title: t("content.info.FullName"),
        dataIndex: "fullName",
        width: 200,
        isSorter: true,
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
                  <Button type="primary">
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
  ];
  const { nonContractedEmployeeData, nonContractedEmployeeTotal } =
    useMemo(() => {
      const employeesDoNotNeedToHaveContracts = contractHistories.filter(
        (contractHistory) =>
          invalidContractStatuses.includes(contractHistory.status)
      );

      const employeesNeedToHaveContracts = employees.filter((employee) => {
        return employeesDoNotNeedToHaveContracts.some(
          (employeesDoNotNeedToHaveContract) => {
            return (
              employeesDoNotNeedToHaveContract.user?.userId !== employee.userId
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

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={managerPaths.CONTRACT_MANAGEMENT}>
                  Contract Management
                </a>
              </div>
            ),
          },
          {
            title: <span>Add Contract</span>,
            menu: {
              items: [
                {
                  key: "1",
                  label: (
                    <a href={`${managerPaths.CONTRACT_MANAGEMENT}`}>
                      Signed Contract
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a
                      href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.ADD_CONTRACT}`}
                    >
                      Add User
                    </a>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <a
                      href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.CANCELLED_CONTRACT}`}
                    >
                      Cancelled Contract
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
    </div>
  );
};

export default AddContractTable;
