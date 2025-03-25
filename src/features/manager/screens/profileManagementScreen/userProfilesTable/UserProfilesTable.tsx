import { Button, Flex } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { UsersData } from "../../../constants/manager.type";
import {
  PageResponse,
  UserDetail,
  UsersQueryParams,
} from "../../../../../common/common.type";
import { getUsers } from "../../../../../api/apiServices";
import {
  GenderId,
  GenderName,
  INIT_PAGE_RESPONSE,
  INIT_USER,
  QueryParamsWithListPosts,
} from "../../../../../common/common.constant";
import ViewUserProfileModel from "./viewUserProfileModel/ViewUserProfileModel";
import DeleteUserProfileModal from "./deleteUserProfileModal/DeleteUserProfileModal";
import { useAppSelector } from "../../../../../app/hooks";
import { useTranslation } from "react-i18next";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";

const UserProfilesTable = () => {
  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );
  const { t } = useTranslation();
  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [queryParams, setQueryParams] = useState<UsersQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
  });

  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);
  const [user, setUser] = useState<UserDetail>(INIT_USER);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    const res = await getUsers(queryParams);
    if (res) {
      // const usersApi = res.data.data as UserDetail[];
      const { data: usersApi, ...pageResponse } = res.data;

      const newUsersApi = usersApi.filter((userApi: UserDetail): boolean => {
        return userApi.userId !== currentAccount.user?.userId;
      });
      setCustomPageParam(pageResponse);

      setUsers(newUsersApi);
      setReset(false);
    }
  }, [queryParams, currentAccount.user?.userId]);

  const usersData: UsersData[] = useMemo(() => {
    return users.map((user) => {
      return {
        rowId: user.userId,
        fullName: user.fullName,
        email: user.account?.email || "",
        gender: user.gender,
        address: user.address,
        phoneNumber: user.phoneNumber,
        nation: user.nation,
        birthday: user.birthday,
        departmentName: user.department?.departmentName || "",
        salaryCoefficient: user.salaryCoefficient,
        positionName: user.position?.positionName || "",
        status: user.status,
        createdAt: dayjs(user.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(user.updatedAt).format("DD-MM-YYYY") || "",
        actions: user,
      };
    });
  }, [users]);

  const accountColumns: ColumnDataCustom<UsersData>[] = [
    {
      title: t("content.info.FullName"),
      dataIndex: "fullName",
      width: 150,
      prioritySort: 4,
    },
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      width: 150,

      prioritySort: 3,
    },
    {
      title: t("content.info.Gender"),
      dataIndex: "gender",
      render: (value) => {
        return value === GenderId.MALE
          ? t(`content.common.${GenderName.MALE}`)
          : t(`content.common.${GenderName.FEMALE}`);
      },
    },
    {
      title: t("content.info.Address"),
      dataIndex: "address",
    },
    {
      title: t("content.info.PhoneNumber"),
      dataIndex: "phoneNumber",
    },
    {
      title: t("content.info.Nation"),
      dataIndex: "nation",
    },
    {
      title: t("content.info.Birthday"),
      dataIndex: "birthday",
    },
    {
      title: t("content.info.DepartmentName"),
      dataIndex: "departmentName",
      isSearch: true,
    },
    {
      title: t("content.info.SalaryCoefficient"),
      dataIndex: "salaryCoefficient",
    },
    {
      title: t("content.info.PositionName"),
      dataIndex: "positionName",
      isSearch: true,
    },

    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      prioritySort: 2,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      prioritySort: 1,
    },
    {
      title: t("content.common.Status"),
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "actions",
      className: "content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleViewAccount(value)}>
              {t("content.common.View")}
            </Button>
            <Button
              onClick={() => handleDeleteAccount(value)}
              type="primary"
              danger
            >
              {" "}
              {t("content.common.Delete")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const handleAddUser = () => {
    navigate("add-user");
  };
  const handleViewAccount = (userDetail: UserDetail) => {
    setUser(userDetail);
    setIsViewModalOpen(true);
  };
  const handleDeleteAccount = (userDetail: UserDetail) => {
    setUser(userDetail);
    setIsDeleteModalOpen(true);
    // setReset(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [reset, queryParams, fetchUsers]);
  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href="/manager/profile-management">
                  {t("content.feature.ProfileManagement")}
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
            {t("content.common.AddUserInfo")}
          </Button>
        }
      />
      <TableComponent<UsersData>
        columnData={accountColumns}
        tableData={usersData}
        // onChange={onChange}

        itemTotal={customPageParam.total}
        paginationQueryParams={queryParams}
        setPaginationQueryParams={setQueryParams}
      />
      <ViewUserProfileModel
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        user={user}
        confirmLoading={!user}
      />
      <DeleteUserProfileModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setReset={setReset}
        user={user}
        confirmLoading={!user}
      />
    </div>
  );
};
export default UserProfilesTable;
