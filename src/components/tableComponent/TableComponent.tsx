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
import type { ColumnType } from "antd/es/table";
import { FilterDropdownProps } from "antd/es/table/interface";
import { memo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { RowType } from "../../common/common.type";

interface FilterObject {
  text: string;
  value: string | number;
}
export interface ColumnDataCustom<T> extends ColumnType<T> {
  isSorter?: boolean;
  isSearch?: boolean;
  filterObjects?: FilterObject[];
}

interface TableComponentProps<T> extends TableProps<T> {
  isWarning?: boolean;
  isSummary?: boolean;
  columnData: ColumnDataCustom<T>[];
  tableData: T[];
}

const TableComponent = <T extends RowType>({
  isWarning,
  isSummary,
  columnData,
  tableData,
  ...tableProps
}: TableComponentProps<T>) => {
  const newTableData = tableData.map((tableDatum) => ({
    ...tableDatum,
    // rowId: index,
  }));

  type DataIndex = keyof T;

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

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<T> => ({
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
    onFilter: (value, record: T) =>
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
  // const onChange: TableProps<T>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  type Key = string | number | bigint;
  const newColumns: TableColumnsType<T> = columnData.map((columnDatum) => {
    if (columnDatum.isSearch) {
      return {
        ...columnDatum,
        ...getColumnSearchProps(columnDatum.dataIndex as keyof T),
      };
    }
    return {
      ...columnDatum,
      sorter: columnDatum.isSorter && {
        compare: (a: T, b: T) =>
          String(a[columnDatum.dataIndex as keyof T]).localeCompare(
            String(b[columnDatum.dataIndex as keyof T])
          ),
      },
      filters: columnDatum.filterObjects,
      onFilter: (
        value: boolean | string | number | Key,
        record: T
      ): boolean => {
        console.log("value:", value);
        console.log("record:", record);
        console.log("---------------");
        return (
          String(record[columnDatum.dataIndex as keyof T]).indexOf(
            value as string
          ) === 0
        );
      },
    };
  });
  return (
    <Table
      rowKey={(record): string => {
        return String(record.rowId);
      }}
      columns={newColumns}
      dataSource={newTableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "full-header" }}
      scroll={{ x: "max-content" }}
      {...tableProps}
    />
  );
};

// export default TableComponent;
export default memo(TableComponent) as <T>(
  props: TableComponentProps<T>
) => JSX.Element;
