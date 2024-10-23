import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Collapse,
  CollapseProps,
  Flex,
  Input,
  InputRef,
  List,
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
import { UserDetail } from "../../../../common/common.type";
import {
  GenderId,
  GenderName,
  INIT_USER,
} from "../../../../common/common.constant";
import { getUsers } from "../../../../api/apiServices";
import { EmployeeColumnType } from "../../constants/manager.type";

import dayjs from "dayjs";
import {
  filterDepartmentOptions,
  filterPositionOptions,
  getAverageScoreToObject,
} from "../../constants/manager.help";
import { useAppSelector } from "../../../../app/hooks";
import UpdateEmployeeModal from "./updateEmployeeModal/UpdateEmployeeModal";
import {
  getDayNameFromNumber,
  getLowerRole,
} from "../../../../common/common.helper";
import EvaluateEmployeeModal from "./evaluateEmployeeModal/EvaluateEmployeeModal";
import { useTranslation } from "react-i18next";

type DataIndex = keyof EmployeeColumnType;
interface TableDataType extends EmployeeColumnType {}

const EmployeeManagementScreen = () => {
  const { account: currentAccount } = useAppSelector(
    (state) => state.account_user
  );
  const { t } = useTranslation();

  const searchInput = useRef<InputRef>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEvaluateModalOpen, setIsEvaluateModalOpen] = useState(false);

  const [reset, setReset] = useState(false);
  const [employees, setEmployees] = useState<UserDetail[]>([INIT_USER]);
  const [employee, setEmployee] = useState<UserDetail>(INIT_USER);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const employeesApi = res.data.data as UserDetail[];
      const newEmployeesApi = employeesApi.filter((employeeApi): boolean => {
        return employeeApi.userId !== currentAccount.user?.userId;
      });
      setEmployees(newEmployeesApi);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [reset]);

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

  const employeesData = useMemo(() => {
    return employees.map((employee) => {
      return {
        key: employee.userId,
        email: employee.account?.email || "",
        fullName: employee.fullName,
        gender: employee.gender || 1,
        departmentName: employee.department?.departmentName || "",
        positionName: employee.position?.positionName || "",
        weeklySchedule: employee.weeklySchedule || [],
        averageScore: getAverageScoreToObject(employee).map((object) => {
          return (
            <List.Item>
              <Tag>
                Năm {object.year}: {object.averageScore ?? "Chưa có đánh giá"}
              </Tag>
            </List.Item>
          );
        }),
        status: employee.status || "",
        createdAt: dayjs(employee.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(employee.updatedAt).format("DD-MM-YYYY") || "",
        actions: employee,
      };
    });
  }, [employees]);

  const EMPLOYEE_COLUMNS: TableColumnsType<TableDataType> = [
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      width: 100,
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 5,
      },
    },
    {
      title: t("content.info.FullName"),
      dataIndex: "fullName",
      width: 150,

      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 4,
      },
      ...getColumnSearchProps("fullName"),
    },
    {
      title: t("content.info.Gender"),
      dataIndex: "gender",
      width: 100,
      render: (value) => {
        return value === GenderId.MALE
          ? t(`content.common.${GenderName.MALE}`)
          : t(`content.common.${GenderName.FEMALE}`);
      },
    },
    {
      title: t("content.info.DepartmentName"),
      dataIndex: "departmentName",
      width: 200,
      sorter: {
        compare: (a, b) => a.departmentName.localeCompare(b.departmentName),
        multiple: 3,
      },
      filters: filterDepartmentOptions,
      onFilter: (value, record) =>
        record.departmentName.indexOf(value as string) === 0,
    },
    {
      title: t("content.info.PositionName"),
      dataIndex: "positionName",
      width: 130,
      sorter: {
        compare: (a, b) => a.positionName.localeCompare(b.positionName),
        multiple: 3,
      },
      filters: filterPositionOptions,
      onFilter: (value, record) =>
        record.positionName.indexOf(value as string) === 0,
    },

    {
      title: t("content.info.WeeklySchedule"),
      dataIndex: "weeklySchedule",
      width: 220,
      render: (value) => getDayNameFromNumber(value),
    },
    {
      title: t("content.info.AverageScore"),
      dataIndex: "averageScore",
      width: 220,
    },
    {
      title: t("content.info.Status"),
      dataIndex: "status",
      width: 100,
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
            <Button
              onClick={() => handleUpdateEmployee(value)}
              type="primary"
              style={{
                width: "100px",
                whiteSpace: "normal",
                height: "46px",
              }}
            >
              {t("content.common.Update")}
            </Button>
            <Button
              onClick={() => handleEvaluateEmployee(value)}
              type="primary"
              style={{ width: "130px", whiteSpace: "normal", height: "46px" }}
            >
              {t("content.common.BtnEvaluate")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const handleUpdateEmployee = (value: UserDetail) => {
    setEmployee(value);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleEvaluateEmployee = (value: UserDetail) => {
    setEmployee(value);
    setIsEvaluateModalOpen(true);
    setReset(false);
  };

  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  const handleGotoAction = (values: any) => {
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
  const items: CollapseProps["items"] = [
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
            {t("content.employee.NoticeNowLevel")}{" "}
            <Tag color="processing">{currentAccount.role?.roleName}</Tag>.
            {t("content.employee.NoticeRoleManagement")}{" "}
            <Tag color="processing">
              {getLowerRole(currentAccount.role?.roleName)}
            </Tag>
            {t("content.employee.DownLevel")} .
          </List.Item>
          <List.Item>{t("content.employee.NoticeOfBenefits")} .</List.Item>
          <List.Item>
            {t("content.employee.AskAboutEvaluate")} ?{" "}
            <Button type="primary" onClick={handleGotoAction}>
              {t("content.common.Yes")}
            </Button>
          </List.Item>
        </Flex>
      ),
    },
  ];
  return (
    <div>
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
            <Table<TableDataType>
              columns={EMPLOYEE_COLUMNS}
              dataSource={employeesData}
              onChange={onChange}
              showSorterTooltip={{ target: "full-header" }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Card>
        <UpdateEmployeeModal
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          setReset={setReset}
          employee={employee}
          confirmLoading={!employee}
        />
        <EvaluateEmployeeModal
          isModalOpen={isEvaluateModalOpen}
          setIsModalOpen={setIsEvaluateModalOpen}
          setReset={setReset}
          employee={employee}
          confirmLoading={!employee}
        />
      </Flex>
    </div>
  );
};
export default EmployeeManagementScreen;
