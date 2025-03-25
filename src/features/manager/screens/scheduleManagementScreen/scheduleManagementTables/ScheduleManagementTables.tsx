import { Button, Card, Flex, Select, Typography } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ScheduleWorkColumnType } from "../../../constants/manager.type";
import {
  CommonQueryParams,
  DepartmentDetail,
  DepartmentsQueryParams,
  DepartmentUserShortInfo,
} from "../../../../../common/common.type";
import {
  GenderId,
  GenderName,
  INIT_DEPARTMENT,
  INIT_DEPARTMENT_USER_SHORT_INFO,
  INIT_QUERY_PARAMS,
} from "../../../../../common/common.constant";
import { getDepartments } from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import { managerPaths } from "../../../constants/constant.path";
import { DefaultOptionType } from "antd/es/select";
import UpdateScheduleModal from "./updateScheduleModal/UpdateScheduleModal";
import OvertimeScheduleTable from "../../../../users/screens/scheduleScreen/overtimeScheduleTable/OvertimeScheduleTable";

const ScheduleManagementTables = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [queryParams, setQueryParams] = useState<DepartmentsQueryParams>({
    page: 1,
    items_per_page: 1,
    departmentId: "",
  });

  const [mockUserQueryParams, setMockUserQueryParams] =
    useState<CommonQueryParams>(INIT_QUERY_PARAMS);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [reset, setReset] = useState<boolean>(false);

  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);

  const [departmentUser, setDepartmentUser] = useState<DepartmentUserShortInfo>(
    INIT_DEPARTMENT_USER_SHORT_INFO
  );

  const [department, setDepartment] =
    useState<DepartmentDetail>(INIT_DEPARTMENT);

  const fetchDepartments = useCallback(async () => {
    const res = await getDepartments();

    if (res) {
      const { data: departmentsApi } = res.data;
      setDepartments(departmentsApi);
    }
  }, []);

  const fetchDepartmentsByQuery = useCallback(async () => {
    const res = await getDepartments(queryParams);

    if (res) {
      const { data: departmentApi } = res.data;
      setDepartment(departmentApi[0]);
      setReset(false);
    }
  }, [queryParams]);

  const departmentOptions: DefaultOptionType[] = useMemo(() => {
    return departments.map((department) => {
      return {
        label: department.departmentName,
        value: department.departmentId,
      };
    });
  }, [departments]);

  const { departmentUserData, departmentUserDataTotal } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    if (department && department.users && department.users.length > 0) {
      const userList = department.users.map((user) => {
        return {
          rowId: user.userId,
          userId: user.userId,
          fullName: user.fullName,
          gender: user.gender,
          address: user.address,
          actions: user,
        };
      });
      setMockUserQueryParams({
        ...mockUserQueryParams,
        page: currentPage,
        items_per_page: itemPerPage,
      });
      return {
        departmentUserData: userList,
        departmentUserDataTotal: userList.length,
      };
    } else {
      return {
        departmentUserData: [],
        departmentUserDataTotal: 0,
      };
    }
  }, [department]);

  const departmentColumns: ColumnDataCustom<ScheduleWorkColumnType>[] = [
    {
      title: t("content.schedule.UserId"),
      dataIndex: "userId",
      width: 150,
      prioritySort: 4,
    },
    {
      title: t("content.schedule.EmployeeName"),
      dataIndex: "fullName",
      prioritySort: 3,
      isSearch: true,
    },
    {
      title: t("content.schedule.Gender"),
      dataIndex: "gender",
      width: 100,
      render: (value) => {
        return value === GenderId.MALE
          ? t(`content.common.${GenderName.MALE}`)
          : t(`content.common.${GenderName.FEMALE}`);
      },
    },
    {
      title: t("content.schedule.Address"),
      dataIndex: "address",
      width: 300,
    },
    {
      title: "",
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button type="primary" onClick={() => handleShiftAdjustment(value)}>
              {t("content.schedule.ShiftAdjustment")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const { customDepartmentUserData } = useMemo(() => {
    const itemPerPage = mockUserQueryParams.items_per_page || 1;
    const currentPage = mockUserQueryParams.page || 1;
    const startIndex = itemPerPage * (currentPage - 1);
    const endIndex = itemPerPage * currentPage - 1;

    return {
      customDepartmentUserData: departmentUserData.slice(
        startIndex,
        endIndex + 1
      ),
    };
  }, [departmentUserData, mockUserQueryParams]);

  const handleSelectDepartment = (value: string) => {
    console.log("value:", value);
    setQueryParams({
      ...queryParams,
      departmentId: value,
    });
  };

  const handleShiftAdjustment = (value: DepartmentUserShortInfo) => {
    setDepartmentUser(value);

    setIsCreateModalOpen(true);
  };
  useEffect(() => {
    fetchDepartmentsByQuery();
  }, [reset, fetchDepartmentsByQuery, queryParams]);

  useEffect(() => {
    fetchDepartments();
  }, [reset, fetchDepartments]);
  console.log("department:", department);
  console.log("departmentUserData:", departmentUserData);

  return (
    <div id="department-management">
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.DEPARTMENT_MANAGEMENT}`}>
                  {t("content.schedule.ScheduleManagement")}
                </a>
              </div>
            ),
          },
        ]}
      />
      <Flex vertical gap={4}>
        <Card>
          <Flex>
            <Typography style={{ width: "30%" }}>
              Chọn phòng để điều chỉnh ca trực
            </Typography>
            <Select
              style={{ width: "70%" }}
              options={departmentOptions}
              onChange={handleSelectDepartment}
            />
          </Flex>
        </Card>

        <Card title={department.departmentName}>
          <TableComponent<ScheduleWorkColumnType>
            columnData={departmentColumns}
            tableData={customDepartmentUserData}
            itemTotal={departmentUserDataTotal}
            paginationQueryParams={mockUserQueryParams}
            setPaginationQueryParams={setMockUserQueryParams}
          />
        </Card>
        <OvertimeScheduleTable reset={reset} />
      </Flex>
      <UpdateScheduleModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        setReset={setReset}
        confirmLoading={!departmentUser}
        employee={departmentUser}
        department={department}
      />
    </div>
  );
};
export default ScheduleManagementTables;
