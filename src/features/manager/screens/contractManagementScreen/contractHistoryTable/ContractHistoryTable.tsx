import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
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

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import {
  getContractHistories,
  getContracts,
  getUsers,
} from "../../../../../api/apiServices";
import {
  ContractDetail,
  ContractHistoryDetail,
  UserDetail,
} from "../../../../../common/common.type";
import {
  GenderId,
  GenderName,
  INIT_CONTRACT,
  INIT_CONTRACT_HISTORY,
  INIT_USER,
} from "../../../../../common/common.constant";
import { ContractHistoryColumnType } from "../../../constants/manager.type";
import DeleteContractHistoryModal from "./deleteContractHistoryModal/DeleteContractHistoryModal";
import UpdateContractHisotryModal from "./updateContractHisotryModal/UpdateContractHisotryModal";
import i18n from "../../../../../utils/i18n";

type DataIndex = keyof ContractHistoryColumnType;
interface TableDataType extends ContractHistoryColumnType {}

const ContractHistoryTable = () => {
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [reset, setReset] = useState<boolean>(false);

  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);
  const [contractHistory, setContractHistory] = useState<ContractHistoryDetail>(
    INIT_CONTRACT_HISTORY
  );
  const [contracts, setContracts] = useState<ContractDetail[]>([INIT_CONTRACT]);
  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);

  const isVN = useMemo(() => i18n.language === "vi", [i18n.language]);

  useEffect(() => {
    fetchContracts();
    fetchContractHistories();
    fetchUsers();
  }, [reset]);

  useEffect(() => {
    fetchContracts();
  }, [isVN]);

  const fetchContractHistories = async () => {
    const res = await getContractHistories();
    if (res) {
      const contractHistoriesApi = res.data.data;
      setContractHistories(contractHistoriesApi);
    }
  };
  const fetchContracts = async () => {
    const res = await getContracts();
    if (res) {
      const contractsApi = res.data.data;
      setContracts(contractsApi);
    }
  };
  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const usersApi = res.data.data;
      setUsers(usersApi);
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

  const contractHistoryData = useMemo(() => {
    return contracts.map((contract) => {
      return {
        title: isVN ? contract.contractNameVI : contract.contractNameEN,
        tableData: contractHistories
          .filter(
            (contractHistory) =>
              contractHistory.contract?.contractId === contract.contractId
          )
          .map((contractHistory, index) => {
            const user = users.find(
              (user) => user.userId === contractHistory.user?.userId
            );

            return {
              key: user?.userId || index,
              fullName: user?.fullName || "",
              positionName: user?.position?.positionName || "",
              gender: user?.gender || 1,
              startDay: contractHistory.startDay,
              endDay: contractHistory.endDay,
              actions: contractHistory,
            };
          }),
      };
    });
  }, [contracts, contractHistories]);

  const CONTRACT_HISTORY_COLUMN: TableColumnsType<TableDataType> = [
    {
      title: t("content.contract.FullName"),
      dataIndex: "fullName",
      width: 200,
      sorter: {
        compare: (a, b) => a.fullName.localeCompare(b.fullName),
        multiple: 4,
      },
    },
    {
      title: t("content.contract.PositionName"),
      dataIndex: "positionName",
      width: 200,

      sorter: {
        compare: (a, b) => a.positionName.localeCompare(b.positionName),
        multiple: 3,
      },
      ...getColumnSearchProps("positionName"),
    },
    {
      title: t("content.common.Gender"),
      dataIndex: "gender",
      width: 150,
      render: (value) => {
        return value === GenderId.MALE
          ? t(`content.common.${GenderName.MALE}`)
          : t(`content.common.${GenderName.FEMALE}`);
      },
    },
    {
      title: t("content.contract.StartDay"),
      dataIndex: "startDay",
      width: 150,

      sorter: {
        compare: (a, b) => a.startDay.localeCompare(b.startDay),
        multiple: 2,
      },
    },
    {
      title: t("content.contract.EndDay"),
      dataIndex: "endDay",
      width: 150,

      sorter: {
        compare: (a, b) => a.endDay.localeCompare(b.endDay),
        multiple: 1,
      },
    },
    {
      dataIndex: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button
              onClick={() => handleUpdateContractHistory(value)}
              type="primary"
            >
              {t("content.common.Update")}
            </Button>
            <Button
              onClick={() => handleDeleteContractHistory(value)}
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

  const handleUpdateContractHistory = (
    contractHistoryDetail: ContractHistoryDetail
  ) => {
    setContractHistory(contractHistoryDetail);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleDeleteContractHistory = (
    contractHistoryDetail: ContractHistoryDetail
  ) => {
    setContractHistory(contractHistoryDetail);

    setIsDeleteModalOpen(true);
    setReset(false);
  };

  return (
    <div>
      <Flex vertical gap={12}>
        {contractHistoryData.map((contractHistoryDatum) => {
          return (
            <Card title={contractHistoryDatum.title}>
              <Table<TableDataType>
                columns={CONTRACT_HISTORY_COLUMN}
                dataSource={contractHistoryDatum.tableData}
                onChange={onChange}
                showSorterTooltip={{ target: "full-header" }}
                scroll={{ x: "max-content" }}
              />
            </Card>
          );
        })}
      </Flex>
      <DeleteContractHistoryModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setReset={setReset}
        contractHistory={contractHistory}
        confirmLoading={!contractHistory}
      />
      <UpdateContractHisotryModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        contractHistory={contractHistory}
        confirmLoading={!contractHistory}
      />
    </div>
  );
};
export default ContractHistoryTable;
