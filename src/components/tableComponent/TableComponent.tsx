import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  TableProps,
} from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContractColumnType } from "../../features/manager/constants/manager.type";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
interface FilterObject {
  text: string;
  value: string | number;
}
interface ColumnDataCustom {
  title: string;
  dataIndex: string;
  isSorter?: boolean;
  isSearch?: boolean;
  filterObject?: FilterObject[];
}
interface TableComponentProps<T> extends TableProps {
  isWarning?: boolean;
  columnData: ColumnDataCustom[] & TableColumnsType<T>;
  tableData: T[];
  isSummary?: boolean;
}
const TableComponent = <T extends {}>({
  isWarning,
  isSummary,
  columnData,
  tableData,
  ...tableProps
}: TableComponentProps<T>) => {
  const newTableData = tableData.map((tableDatum, index) => ({
    ...tableDatum,
    rowId: index,
  }));

  interface TableDataType extends T {}
  type DataIndex = keyof TableDataType;

  const searchInput = useRef<InputRef>(null);

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
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
          placeholder={`Search ${dataIndex as string}`}
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
              setSearchedColumn(dataIndex as string);
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
    onFilter: (value, record: TableDataType) =>
      String(record[dataIndex])
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
  type Key = string | number | bigint;
  const newColumns: TableColumnsType<TableDataType> = columnData.map(
    (columnDatum) => {
      if (columnDatum.isSearch) {
        return {
          ...columnDatum,
          ...getColumnSearchProps(columnDatum.dataIndex as keyof TableDataType),
        };
      }
      return {
        ...columnDatum,
        sorter: columnDatum.isSorter && {
          compare: (a: TableDataType, b: TableDataType) =>
            String(
              a[columnDatum.dataIndex as keyof TableDataType]
            ).localeCompare(
              String(b[columnDatum.dataIndex as keyof TableDataType])
            ),
        },
        filters: columnDatum.filterObject,
        onFilter: (
          value: boolean | string | number | Key,
          record: TableDataType
        ): boolean => {
          console.log("value:", value);
          console.log("record:", record);
          console.log("---------------");
          return (
            String(
              record[columnDatum.dataIndex as keyof TableDataType]
            ).indexOf(value as string) === 0
          );
        },
      };
    }
  );
  return (
    <Table
      rowKey={(record): string => record.rowId.toString()}
      columns={newColumns}
      dataSource={newTableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "full-header" }}
      scroll={{ x: "max-content" }}
      {...tableProps}
    />
  );
};

export default memo(TableComponent);
