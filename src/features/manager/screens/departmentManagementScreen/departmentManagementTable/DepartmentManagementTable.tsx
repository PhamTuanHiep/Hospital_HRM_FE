import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Input,
  InputRef,
  List,
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
import UpdateDepartmentModal from "./updateDepartmentModal/UpdateDepartmentModal";
import DeleteDepartmentModal from "./deleteDepartmentModal/DeleteDepartmentModal";
import HinderDeleteDepartmentModal from "./hinderDeleteDepartmentModal/HinderDeleteDepartmentModal";
import { DepartmentColumnType } from "../../../constants/manager.type";
import { DepartmentDetail } from "../../../../../common/common.type";
import { INIT_DEPARTMENT } from "../../../../../common/common.constant";
import { getDepartments } from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";

type DataIndex = keyof DepartmentColumnType;
interface TableDataType extends DepartmentColumnType {}

const DepartmentManagementTable = () => {
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHinderDeleteModalOpen, setIsHinderDeleteModalOpen] = useState(false);

  const [reset, setReset] = useState(false);

  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);
  const [department, setDepartment] =
    useState<DepartmentDetail>(INIT_DEPARTMENT);

  useEffect(() => {
    fetchDepartments();
  }, [reset]);

  const fetchDepartments = async () => {
    const res = await getDepartments();
    if (res) {
      setDepartments(res.data.data);
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

  const departmentData = useMemo(() => {
    return departments.map((department) => {
      return {
        key: department.departmentId,
        departmentId: department.departmentId,
        departmentName: department.departmentName,
        location: department.location,
        funcDescription: department.funcDescription,

        users:
          department.users && department.users.length > 0 ? (
            <List>
              {department.users.map((user) => (
                <List.Item>{user.fullName}</List.Item>
              ))}
            </List>
          ) : (
            <div className="null-cell_content-center">-</div>
          ),
        createdAt: dayjs(department.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(department.updatedAt).format("DD-MM-YYYY") || "",
        actions: department,
      };
    });
  }, [departments]);

  const departmentColumns: TableColumnsType<TableDataType> = [
    {
      title: "departmentId",
      dataIndex: "departmentId",
      sorter: {
        compare: (a, b) => a.departmentId.localeCompare(b.departmentId),
        multiple: 4,
      },
    },
    {
      title: "departmentName",
      dataIndex: "departmentName",
      sorter: {
        compare: (a, b) => a.departmentName.localeCompare(b.departmentName),
        multiple: 3,
      },
      ...getColumnSearchProps("departmentName"),
    },
    {
      title: "location",
      dataIndex: "location",
    },
    {
      title: "funcDescription",
      dataIndex: "funcDescription",
    },
    {
      title: "users",
      dataIndex: "users",
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
      title: "Action",
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleUpdateAccount(value)} type="primary">
              Update
            </Button>
            <Button
              onClick={() => handleDeleteAccount(value)}
              type="primary"
              danger
            >
              Delete
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
  return (
    <div id="department-management">
      <Button
        type="primary"
        className="btn-add-object"
        onClick={() => handleAddUser()}
      >
        Add Department
      </Button>
      <Table<TableDataType>
        columns={departmentColumns}
        dataSource={departmentData}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
        scroll={{ x: "max-content" }}
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
