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
  Tag,
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
import { useTranslation } from "react-i18next";

type DataIndex = keyof DepartmentColumnType;
interface TableDataType extends DepartmentColumnType {}

const DepartmentManagementTable = () => {
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
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

  const departmentColumns: TableColumnsType<TableDataType> = [
    {
      title: t("content.department.DepartmentId"),
      dataIndex: "departmentId",
      width: 100,
      sorter: {
        compare: (a, b) => a.departmentId.localeCompare(b.departmentId),
        multiple: 4,
      },
    },
    {
      title: t("content.department.DepartmentName"),
      dataIndex: "departmentName",
      width: 100,

      sorter: {
        compare: (a, b) => a.departmentName.localeCompare(b.departmentName),
        multiple: 3,
      },
      ...getColumnSearchProps("departmentName"),
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

      sorter: {
        compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
        multiple: 2,
      },
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      width: 130,

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

  return (
    <div id="department-management">
      <Button
        type="primary"
        className="btn-add-object"
        onClick={() => handleAddUser()}
      >
        {t("content.department.AddDepartment")}
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
