import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  TableProps,
} from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useEffect, useMemo, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { AccountDetail } from "../../../../common/common.type";
import { INIT_ACCOUNT } from "../../../../common/common.constant";
import { getAccounts } from "../../../../api/apiServices";
import UpdateAccountModal from "./updateAccountModel/UpdateAccountModal";
import dayjs from "dayjs";
import ViewAccountModal from "./viewAccountModel/ViewAccountModel";
import DeleteAccountModal from "./deleteAccountModel/DeleteAccountModal";
import { useAppSelector } from "../../../../app/hooks";
import { useTranslation } from "react-i18next";
import TableComponent from "../../../../components/tableComponent/TableComponent";
import { AccountsData } from "../../constants/manager.type";
import { filterAccountsByRole } from "../../../../common/common.helper";

type DataIndex = keyof AccountsData;
interface TableDataType extends AccountsData {}
const AccountManagementScreen = () => {
  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );
  const { t } = useTranslation();

  const searchInput = useRef<InputRef>(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [accounts, setAccounts] = useState<AccountDetail[]>([INIT_ACCOUNT]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [reset, setReset] = useState(false);

  const [account, setAccount] = useState<AccountDetail>(INIT_ACCOUNT);
  console.log("accounts:", accounts);

  useEffect(() => {
    fetchAccounts();
  }, [reset]);

  const fetchAccounts = async () => {
    const res = await getAccounts();
    if (res) {
      const accountsApi = res.data.data as AccountDetail[];

      const newAccountsApi = filterAccountsByRole(accountsApi, currentAccount);
      setAccounts(newAccountsApi);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    console.log("s-dataIndex:", dataIndex);
    console.log("s-typeof dataIndex:", typeof dataIndex);

    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TableDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      return (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      console.log("f-dataIndex:", dataIndex);
      console.log("f-value:", value);
      console.log("f-record:", record);

      console.log("f-typeof dataIndex:", typeof dataIndex);

      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const onChange: TableProps<TableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const accountsData = useMemo(() => {
    return accounts.map((account) => {
      return {
        key: account.accountId,
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

  const accountColumns: TableColumnsType<TableDataType> = [
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 4,
      },
    },
    {
      title: t("content.info.Password"),
      dataIndex: "password",
    },
    {
      title: t("content.info.Role"),
      dataIndex: "roleName",
      sorter: {
        compare: (a, b) => a.roleName.localeCompare(b.roleName),
        multiple: 3,
      },
      filters: [
        {
          text: "Manager",
          value: "Manager",
        },
        {
          text: "User",
          value: "User",
        },
      ],
      onFilter: (value, record) => {
        console.log("value:", value);
        console.log("record:", record);
        console.log("---------------");
        return record.roleName.indexOf(value as string) === 0;
      },
    },
    {
      title: t("content.info.FullName"),
      dataIndex: "userName",
      ...getColumnSearchProps("userName"),
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      sorter: {
        compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
        multiple: 2,
      },
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
  const otherColumn = [
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      isSorter: true,
    },
    {
      title: t("content.info.Password"),
      dataIndex: "password",
    },
    {
      title: t("content.info.Role"),
      dataIndex: "roleName",
      isSorter: true,
      filterObject: [
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
      isSorter: true,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      isSorter: true,
    },
    {
      title: "",
      dataIndex: "actions",
      className: "title_content-center",
      render: (value: AccountDetail) => {
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

  return (
    <div>
      <Table<TableDataType>
        columns={accountColumns}
        dataSource={accountsData}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
        scroll={{ x: "max-content" }}
      />

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
export default AccountManagementScreen;
