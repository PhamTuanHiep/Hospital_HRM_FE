import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
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

import { useTranslation } from "react-i18next";
import { getContracts } from "../../../../../api/apiServices";
import { ContractDetail } from "../../../../../common/common.type";
import { INIT_CONTRACT } from "../../../../../common/common.constant";
import { ContractColumnType } from "../../../constants/manager.type";
import i18n from "../../../../../utils/i18n";
import dayjs from "dayjs";
import UpdateContractModal from "./updateContractModal/UpdateContractModal";
import DeleteContractModal from "./deleteContractModal/DeleteContractModal";

type DataIndex = keyof ContractColumnType;
interface TableDataType extends ContractColumnType {}

const ContractTable = () => {
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [reset, setReset] = useState<boolean>(false);

  const [contracts, setContracts] = useState<ContractDetail[]>([INIT_CONTRACT]);
  const [contract, setContract] = useState<ContractDetail>(INIT_CONTRACT);

  const isVN = useMemo(() => i18n.language === "vi", [i18n.language]);

  useEffect(() => {
    fetchContracts();
  }, [reset]);

  useEffect(() => {
    fetchContracts();
  }, [isVN]);

  const fetchContracts = async () => {
    const res = await getContracts();
    if (res) {
      const contractsApi = res.data.data;
      setContracts(contractsApi);
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

  const contractData = useMemo(() => {
    return contracts.map((contract) => {
      return {
        key: contract.contractId,
        contractId: contract.contractId,
        contractName: contract.contractNameVI,
        note: (
          <List>
            {contract.note.map((noteItem) => {
              return <List.Item>{noteItem}</List.Item>;
            })}
          </List>
        ),

        createdAt: dayjs(contract.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(contract.updatedAt).format("DD-MM-YYYY") || "",
        actions: contract,
      };
    });
  }, [contracts]);

  const CONTRACT_COLUMNS: TableColumnsType<TableDataType> = [
    {
      title: t("content.contract.ContractId"),
      dataIndex: "contractId",
      width: 200,
      sorter: {
        compare: (a, b) => a.contractId.localeCompare(b.contractId),
        multiple: 4,
      },
    },
    {
      title: t("content.contract.ContractName"),
      dataIndex: "contractName",
      width: 200,
      sorter: {
        compare: (a, b) => a.contractName.localeCompare(b.contractName),
        multiple: 3,
      },
      ...getColumnSearchProps("contractName"),
    },
    {
      title: t("content.common.Note"),
      dataIndex: "note",
      width: 200,
      sorter: {
        compare: (a, b) => a.contractId.localeCompare(b.contractId),
        multiple: 4,
      },
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      width: 150,

      sorter: {
        compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
        multiple: 2,
      },
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      width: 150,

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

  const handleUpdateContractHistory = (contractDetail: ContractDetail) => {
    setContract(contractDetail);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleDeleteContractHistory = (contractDetail: ContractDetail) => {
    setContract(contractDetail);
    setIsDeleteModalOpen(true);
    setReset(false);
  };

  return (
    <div>
      <Flex vertical gap={12}>
        <Card title="Hợp đồng làm việc xác định thời hạn (viên chức)">
          <Table<TableDataType>
            columns={CONTRACT_COLUMNS}
            dataSource={contractData}
            onChange={onChange}
            showSorterTooltip={{ target: "full-header" }}
            scroll={{ x: "max-content" }}
          />
        </Card>
        <Card title="Hợp đồng làm việc không xác định thời hạn (viên chức)">
          <Table<TableDataType>
            columns={CONTRACT_COLUMNS}
            dataSource={contractData}
            onChange={onChange}
            showSorterTooltip={{ target: "full-header" }}
            scroll={{ x: "max-content" }}
          />
        </Card>
        <Card title="Hợp đồng lao động xác định thời hạn ">
          <Table<TableDataType>
            columns={CONTRACT_COLUMNS}
            dataSource={contractData}
            onChange={onChange}
            showSorterTooltip={{ target: "full-header" }}
            scroll={{ x: "max-content" }}
          />
        </Card>
        <Card title="Hợp đồng lao động không xác định thời hạn">
          <Table<TableDataType>
            columns={CONTRACT_COLUMNS}
            dataSource={contractData}
            onChange={onChange}
            showSorterTooltip={{ target: "full-header" }}
            scroll={{ x: "max-content" }}
          />
        </Card>
        <Card title="Hợp đồng thời vụ">
          <Table<TableDataType>
            columns={CONTRACT_COLUMNS}
            dataSource={contractData}
            onChange={onChange}
            showSorterTooltip={{ target: "full-header" }}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </Flex>

      <DeleteContractModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setReset={setReset}
        contract={contract}
        confirmLoading={!contract}
      />
      <UpdateContractModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        contract={contract}
        confirmLoading={!contract}
      />
    </div>
  );
};
export default ContractTable;
