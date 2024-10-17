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
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { UsersData } from "../../../constants/manager.type";
import { UserDetail } from "../../../../../common/common.type";
import { getUsers } from "../../../../../api/apiServices";
import { INIT_USER } from "../../../../../common/common.constant";
import ViewUserProfileModel from "./viewUserProfileModel/ViewUserProfileModel";
import DeleteUserProfileModal from "./deleteUserProfileModal/DeleteUserProfileModal";

type DataIndex = keyof UsersData;
interface TableDataType extends UsersData {}

const UserProfilesTable = () => {
  const searchInput = useRef<InputRef>(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);
  const [user, setUser] = useState<UserDetail>(INIT_USER);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, [reset]);

  const fetchAccounts = async () => {
    const res = await getUsers();
    if (res) {
      setUsers(res.data.data);
    }
  };

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
  ): TableColumnType<TableDataType> => ({
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

  const onChange: TableProps<TableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const usersData = useMemo(() => {
    return users.map((user) => {
      return {
        key: user.userId,
        fullName: user.fullName,
        email: user.account?.email || "",
        gender: user.gender,
        address: user.address,
        phoneNumber: user.phoneNumber,
        nation: user.nation,
        birthday: user.birthday,
        departmentName: user.department?.departmentName || "",
        positionName: user.position?.positionName || "",
        status: user.status,
        createdAt: dayjs(user.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(user.updatedAt).format("DD-MM-YYYY") || "",
        actions: user,
      };
    });
  }, [users]);

  const accountColumns: TableColumnsType<TableDataType> = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      width: 150,
      sorter: {
        compare: (a, b) => a.fullName.localeCompare(b.fullName),
        multiple: 4,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,

      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 4,
      },
    },
    {
      title: "gender",
      dataIndex: "gender",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "nation",
      dataIndex: "nation",
    },
    {
      title: "birthday",
      dataIndex: "birthday",
    },
    {
      title: "departmentName",
      dataIndex: "departmentName",
      ...getColumnSearchProps("departmentName"),
    },
    {
      title: "positionName",
      dataIndex: "positionName",
      ...getColumnSearchProps("positionName"),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: {
        compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
        multiple: 2,
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      sorter: {
        compare: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
        multiple: 1,
      },
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "actions",
      className: "content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleViewAccount(value)}>
              Xem chi tiết
            </Button>
            <Button
              onClick={() => handleDeleteAccount(value)}
              type="primary"
              danger
            >
              {" "}
              Xóa
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

  return (
    <div>
      <Button
        type="primary"
        className="btn-add-object"
        onClick={() => handleAddUser()}
      >
        Add User
      </Button>
      <Table<UsersData>
        columns={accountColumns}
        dataSource={usersData}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
        scroll={{ x: "max-content" }}
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
