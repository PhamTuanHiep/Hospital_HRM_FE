import { Button, Card, Collapse, CollapseProps, Flex, List, Tag } from "antd";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../app/hooks";
import { useTranslation } from "react-i18next";
import {
  AccountDetail,
  PageResponse,
  UsersQueryParams,
} from "../../../../../common/common.type";
import {
  INIT_ACCOUNT,
  INIT_PAGE_RESPONSE,
  QueryParamsWithListPosts,
} from "../../../../../common/common.constant";
import { getAccounts } from "../../../../../api/apiServices";
import { AccountsData } from "../../../constants/manager.type";
import dayjs from "dayjs";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";
import UpdateAccountModal from "./updateAccountModel/UpdateAccountModal";
import ViewAccountModal from "./viewAccountModel/ViewAccountModel";
import DeleteAccountModal from "./deleteAccountModel/DeleteAccountModal";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";
import { getLowerRole } from "../../../../../common/common.helper";

const AccountManagementTable = () => {
  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [queryParams, setQueryParams] = useState<UsersQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
    roleId: currentAccount.role?.roleId,
  });

  const [accounts, setAccounts] = useState<AccountDetail[]>([INIT_ACCOUNT]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [reset, setReset] = useState(false);

  const [account, setAccount] = useState<AccountDetail>(INIT_ACCOUNT);
  console.log("accounts:", accounts);

  const fetchAccounts = useCallback(async () => {
    const res = await getAccounts(queryParams);
    console.log("res:", res);

    if (res) {
      const { data: accountsApi, ...pageResponse } = res.data;
      setAccounts(accountsApi);
      setCustomPageParam(pageResponse);
      setReset(false);
    }
  }, [queryParams]);

  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  const handleGotoAction = () => {
    const goToTableCard = document.getElementById("employee-table");
    goToTableCard?.scrollIntoView({ behavior: "instant", block: "start" });

    if (tableContainerRef.current) {
      // Scroll ngang đến vị trí cột thứ 3 (ví dụ "Address")
      const tableBody =
        tableContainerRef.current.querySelector(".ant-table-content");

      if (tableBody) {
        tableBody.scrollLeft = 900; // Thực hiện cuộn ngang
      }
    }
  };

  const items: CollapseProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: (
          <Flex>
            {t("content.employee.Hello")} {currentAccount.user?.fullName}{" "}
          </Flex>
        ),
        children: (
          <Flex vertical justify="space-between" align="start" gap={8}>
            <List.Item>
              {t("content.account.NoticeNowLevel")}{" "}
              <Tag color="processing">{currentAccount.role?.roleName}</Tag>.
              {t("content.account.NoticeRoleManagement")}{" "}
              <Tag color="processing">
                {getLowerRole(currentAccount.role?.roleName)}
              </Tag>
              {t("content.account.DownLevel")} .
            </List.Item>
            <List.Item>{t("content.account.NoticeOfBenefits")} .</List.Item>
            <List.Item>
              {t("content.account.AskAboutEvaluate")} ?{" "}
              <Button type="primary" onClick={handleGotoAction}>
                {t("content.common.Yes")}
              </Button>
            </List.Item>
          </Flex>
        ),
      },
    ],
    []
  );

  const accountsData: AccountsData[] = useMemo(() => {
    return accounts.map((account) => {
      return {
        rowId: account.accountId,
        email: account.email,
        password: account.password,
        roleName: account.role?.roleName || "",
        userName: account.user?.fullName || "",
        createdAt: dayjs(account.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(account.updatedAt).format("DD-MM-YYYY") || "",
        actions: account,
      };
    });
  }, [accounts]);

  const accountColumns: ColumnDataCustom<AccountsData>[] = [
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      prioritySort: 4,
    },
    {
      title: t("content.info.Password"),
      dataIndex: "password",
    },
    {
      title: t("content.info.Role"),
      dataIndex: "roleName",
      prioritySort: 3,

      filterObjects: [
        {
          text: "Manager",
          value: "Manager",
        },
        {
          text: "User",
          value: "User",
        },
      ],
    },
    {
      title: t("content.info.FullName"),
      dataIndex: "userName",
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
      sorter: {
        compare: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
        multiple: 1,
      },
    },
    {
      title: "",
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleViewAccount(value)}>View</Button>
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

  const handleViewAccount = (accountDetail: AccountDetail) => {
    setAccount(accountDetail);
    setIsViewModalOpen(true);
  };

  const handleUpdateAccount = (accountDetail: AccountDetail) => {
    setAccount(accountDetail);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteAccount = (accountDetail: AccountDetail) => {
    setAccount(accountDetail);
    setIsDeleteModalOpen(true);
  };
  const handleNavigationToAccountCreationScreen = () => {
    navigate(managerChildPaths.ADD_ACCOUNT);
  };

  useEffect(() => {
    fetchAccounts();
  }, [reset, fetchAccounts]);

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
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => handleNavigationToAccountCreationScreen()}
          >
            {t("content.account.CreateAccount")}
          </Button>
        }
      />

      <Flex vertical gap={12}>
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChangeCollapse}
        />
        <Card
          id="employee-table"
          title={t("content.employee.ManageEmployeesTitle")}
        >
          <div ref={tableContainerRef}>
            <TableComponent<AccountsData>
              columnData={accountColumns}
              tableData={accountsData}
              itemTotal={customPageParam.total}
              paginationQueryParams={queryParams}
              setPaginationQueryParams={setQueryParams}
            />
          </div>
        </Card>
      </Flex>

      <UpdateAccountModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        account={account}
        confirmLoading={!account}
      />
      <ViewAccountModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        account={account}
        confirmLoading={!account}
      />
      <DeleteAccountModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setReset={setReset}
        account={account}
        confirmLoading={!account}
      />
    </div>
  );
};
export default AccountManagementTable;
