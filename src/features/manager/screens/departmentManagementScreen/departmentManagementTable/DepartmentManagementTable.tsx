import { Button, Flex, Tag } from "antd";

import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import UpdateDepartmentModal from "./updateDepartmentModal/UpdateDepartmentModal";
import DeleteDepartmentModal from "./deleteDepartmentModal/DeleteDepartmentModal";
import HinderDeleteDepartmentModal from "./hinderDeleteDepartmentModal/HinderDeleteDepartmentModal";
import { DepartmentColumnType } from "../../../constants/manager.type";
import {
  DepartmentDetail,
  PageResponse,
  UsersQueryParams,
} from "../../../../../common/common.type";
import {
  INIT_DEPARTMENT,
  INIT_PAGE_RESPONSE,
  QueryParamsWithListPosts,
} from "../../../../../common/common.constant";
import { getDepartments } from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import { managerPaths } from "../../../constants/constant.path";

const DepartmentManagementTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [queryParams, setQueryParams] = useState<UsersQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isHinderDeleteModalOpen, setIsHinderDeleteModalOpen] =
    useState<boolean>(false);

  const [reset, setReset] = useState<boolean>(false);

  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);
  const [department, setDepartment] =
    useState<DepartmentDetail>(INIT_DEPARTMENT);

  const fetchDepartments = async () => {
    const res = await getDepartments();

    if (res) {
      const { data: departmentsApi, ...pageResponse } = res.data;
      setDepartments(departmentsApi);
      setCustomPageParam(pageResponse);
      setReset(false);
    }
  };

  const departmentData: DepartmentColumnType[] = useMemo(() => {
    return departments.map((department) => {
      return {
        rowId: department.departmentId,
        departmentId: department.departmentId,
        departmentName: department.departmentName,
        location: department.location,
        funcDescription: department.funcDescription,

        users:
          department.users && department.users.length > 0 ? (
            <Flex gap="4px 0" wrap>
              {department.users.map((user) => (
                <Tag color="default">{user.fullName}</Tag>
              ))}
            </Flex>
          ) : (
            <div className="null-cell_content-center">-</div>
          ),
        createdAt: dayjs(department.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(department.updatedAt).format("DD-MM-YYYY") || "",
        actions: department,
      };
    });
  }, [departments]);

  const departmentColumns: ColumnDataCustom<DepartmentColumnType>[] = [
    {
      title: t("content.department.DepartmentId"),
      dataIndex: "departmentId",
      width: 100,
      prioritySort: 4,
    },
    {
      title: t("content.department.DepartmentName"),
      dataIndex: "departmentName",
      width: 100,

      prioritySort: 4,
      isSearch: true,
    },
    {
      title: t("content.department.Location"),
      dataIndex: "location",
      width: 200,
    },
    {
      title: t("content.department.FuncDescription"),
      dataIndex: "funcDescription",
      width: 300,
    },
    {
      title: t("content.department.Users"),
      dataIndex: "users",
      width: 200,
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      width: 130,
      prioritySort: 3,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      width: 130,
      prioritySort: 1,
    },
    {
      title: "",
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleUpdateAccount(value)} type="primary">
              {t("content.common.Update")}
            </Button>
            <Button
              onClick={() => handleDeleteAccount(value)}
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

  const isDelete = useMemo(
    () => (department.users && department.users?.length > 0 ? false : true),
    [department]
  );

  const handleUpdateAccount = (departmentDetail: DepartmentDetail) => {
    setDepartment(departmentDetail);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleDeleteAccount = (departmentDetail: DepartmentDetail) => {
    setDepartment(departmentDetail);
    if (isDelete) {
      setIsDeleteModalOpen(true);
      setReset(false);
    } else {
      setIsHinderDeleteModalOpen(true);
    }
  };
  const handleAddUser = () => {
    navigate("add-department");
  };

  useEffect(() => {
    fetchDepartments();
  }, [reset]);

  return (
    <div id="department-management">
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.DEPARTMENT_MANAGEMENT}`}>
                  {t("content.feature.DepartmentManagement")}
                </a>
              </div>
            ),
          },
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => handleAddUser()}
          >
            {t("content.department.CreateDepartment")}
          </Button>
        }
      />

      <TableComponent<DepartmentColumnType>
        columnData={departmentColumns}
        tableData={departmentData}
        itemTotal={customPageParam.total}
        paginationQueryParams={queryParams}
        setPaginationQueryParams={setQueryParams}
      />

      <UpdateDepartmentModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        department={department}
        confirmLoading={!department}
      />
      {isDelete ? (
        <DeleteDepartmentModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          setReset={setReset}
          department={department}
          confirmLoading={!department}
        />
      ) : (
        <HinderDeleteDepartmentModal
          isModalOpen={isHinderDeleteModalOpen}
          setIsModalOpen={setIsHinderDeleteModalOpen}
          confirmLoading={!department}
        />
      )}
    </div>
  );
};
export default DepartmentManagementTable;
