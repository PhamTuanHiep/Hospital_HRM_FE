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
import { PositionColumnType } from "../../../constants/manager.type";
import {
  PositionAllowanceDetail,
  PositionDetail,
} from "../../../../../common/common.type";
import {
  INIT_POSITION,
  INIT_POSITION_ALLOWANCE_DETAIL,
} from "../../../../../common/common.constant";
import {
  getPositionAllowances,
  getPositions,
} from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";
import UpdateJobModal from "./updateJobModal/UpdateJobModal";
import DeleteJobModal from "./deleteJobModal/DeleteJobModal";
import HinderDeleteJobModal from "./hinderDeleteJobModal/HinderDeleteJobModal";
import { managerChildPaths } from "../../../constants/constant.path";
import { useTranslation } from "react-i18next";

type DataIndex = keyof PositionColumnType;
interface TableDataType extends PositionColumnType {}

const JobManagementTable = () => {
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
  const [positionAllowances, setPositionAllowances] = useState<
    PositionAllowanceDetail[]
  >([INIT_POSITION_ALLOWANCE_DETAIL]);

  const [positions, setPositions] = useState<PositionDetail[]>([INIT_POSITION]);
  const [position, setPosition] = useState<PositionDetail>(INIT_POSITION);

  useEffect(() => {
    fetchPositions();
    fetchPositionAllowances();
  }, [reset]);

  const fetchPositions = async () => {
    const res = await getPositions();
    if (res) {
      setPositions(res.data.data);
    }
  };

  const fetchPositionAllowances = async () => {
    const res = await getPositionAllowances();
    if (res) {
      setPositionAllowances(res.data.data);
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

  const positionData = useMemo(() => {
    return positions.map((position) => {
      return {
        key: position.positionId,
        positionId: position.positionId,
        positionName: position.positionName,

        users:
          position.users && position.users.length > 0 ? (
            <Flex gap="4px 0" wrap>
              {position.users.map((user) => (
                <Tag color="default">{user.fullName}</Tag>
              ))}
            </Flex>
          ) : (
            <div className="null-cell_content-center">-</div>
          ),
        positionAllowances:
          position.positionAllowances &&
          position.positionAllowances.length > 0 ? (
            <Flex gap="4px 0" wrap>
              {position.positionAllowances.map((positionAllowance) => (
                <Tag>
                  {
                    positionAllowances.find(
                      (position_allowance) =>
                        position_allowance.id === positionAllowance.id
                    )?.allowance?.allowanceName
                  }
                </Tag>
              ))}
            </Flex>
          ) : (
            <div className="null-cell_content-center">-</div>
          ),
        createdAt: dayjs(position.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(position.updatedAt).format("DD-MM-YYYY") || "",
        actions: position,
      };
    });
  }, [positions]);

  const POSITION_COLUMNS: TableColumnsType<TableDataType> = [
    {
      title: t("content.position.PositionId"),
      dataIndex: "positionId",
      sorter: {
        compare: (a, b) => a.positionId.localeCompare(b.positionId),
        multiple: 4,
      },
    },
    {
      title: t("content.position.PositionName"),
      dataIndex: "positionName",
      sorter: {
        compare: (a, b) => a.positionName.localeCompare(b.positionName),
        multiple: 3,
      },
      ...getColumnSearchProps("positionName"),
    },
    {
      title: t("content.position.Users"),
      dataIndex: "users",
      width: 250,
    },
    {
      title: t("content.position.PositionAllowances"),
      dataIndex: "positionAllowances",
      width: 250,
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
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleUpdatePosition(value)} type="primary">
              {t("content.common.Update")}
            </Button>
            <Button
              onClick={() => handleDeletePosition(value)}
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
    () => (position.users && position.users?.length > 0 ? false : true),
    [position]
  );

  const handleUpdatePosition = (positionDetail: PositionDetail) => {
    setPosition(positionDetail);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleDeletePosition = (positionDetail: PositionDetail) => {
    setPosition(positionDetail);
    if (isDelete) {
      setIsDeleteModalOpen(true);
      setReset(false);
    } else {
      setIsHinderDeleteModalOpen(true);
    }
  };
  const handleAddPosition = () => {
    navigate(managerChildPaths.ADD_POSITION);
  };

  return (
    <div id="department-management">
      <Button
        type="primary"
        className="btn-add-object"
        onClick={() => handleAddPosition()}
      >
        {t("content.position.CreatePosition")}
      </Button>
      <Table<TableDataType>
        columns={POSITION_COLUMNS}
        dataSource={positionData}
        onChange={onChange}
        showSorterTooltip={{ target: "full-header" }}
        scroll={{ x: "max-content" }}
      />
      <UpdateJobModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        position={position}
        confirmLoading={!position}
      />
      {isDelete ? (
        <DeleteJobModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          setReset={setReset}
          position={position}
          confirmLoading={!position}
        />
      ) : (
        <HinderDeleteJobModal
          isModalOpen={isHinderDeleteModalOpen}
          setIsModalOpen={setIsHinderDeleteModalOpen}
          confirmLoading={!position}
        />
      )}
    </div>
  );
};
export default JobManagementTable;
