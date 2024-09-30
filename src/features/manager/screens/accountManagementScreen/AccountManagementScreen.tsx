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
import { Account, Role, User } from "../../../../common/common.type";
import {
  INIT_ACCOUNT,
  INIT_ROLE,
  INIT_USER,
} from "../../../../common/common.constant";
import { getAccounts, getRoles, getUsers } from "../../../../api/apiServices";
import { useAppSelector } from "../../../../app/hooks";
import { AccountsData } from "../../constants/manager.type";

type DataIndex = keyof AccountsData;

const AccountManagementScreen = () => {
  const currentAccount = useAppSelector((state) => state.account_user.account);
  const searchInput = useRef<InputRef>(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([INIT_ACCOUNT]);
  const [roles, setRoles] = useState<Role[]>([INIT_ROLE]);
  const [users, setUsers] = useState<User[]>([INIT_USER]);

  useEffect(() => {
    fetchAccounts();
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchAccounts = async () => {
    const res = await getAccounts();
    if (res) {
      setAccounts(res.data.data);
    }
  };

  const fetchRoles = async () => {
    const res = await getRoles();
    if (res) {
      setRoles(res.data.data);
    }
  };

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      setUsers(res.data.data);
    }
  };
  const accountsData = useMemo(() => {
    return accounts.map((account) => {
      return {
        key: account.accountId,
        email: account.email,
        password: account.password,
        roleName:
          roles.find((role) => role.roleId === account.roleId)?.roleName || "",
        userName:
          users.find((user) => user.userId === account.userId)?.fullName || "",
        createdByName:
          users.find((user) => user.userId === account.createdById)?.fullName ||
          "",
        updatedByName:
          users.find((user) => user.userId === account.updatedById)?.fullName ||
          "",
        actions: account.accountId,
      };
    });
  }, [accounts]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
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
  ): TableColumnType<AccountsData> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
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

  const onChange: TableProps<AccountsData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const accountColumns: TableColumnsType<AccountsData> = [
    {
      title: "email",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 4,
      },
    },
    {
      title: "password",
      dataIndex: "password",
    },
    {
      title: "roleName",
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
      onFilter: (value, record) =>
        record.roleName.indexOf(value as string) === 0,
    },
    {
      title: "userName",
      dataIndex: "userName",
      ...getColumnSearchProps("userName"),
    },
    {
      title: "createdByName",
      dataIndex: "createdByName",
      sorter: {
        compare: (a, b) => a.createdByName.localeCompare(b.createdByName),
        multiple: 2,
      },
    },
    {
      title: "updatedByName",
      dataIndex: "updatedByName",
      sorter: {
        compare: (a, b) => a.updatedByName.localeCompare(b.updatedByName),
        multiple: 1,
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (value) => {
        console.log("value:", value);
        return (
          <Flex justify="space-between" gap={8}>
            <Button>View</Button>
            <Button type="primary">Update</Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <div>
      <Table<AccountsData>
        columns={accountColumns}
        dataSource={accountsData}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
      />
    </div>
  );
};
export default AccountManagementScreen;
