import { Flex, Pagination } from "antd";
import { CommonQueryParams } from "../../common/common.type";
interface PaginationAntdProps {
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  queryParams: CommonQueryParams;
  setQueryParams: Function;
}
const PaginationAntd = ({
  defaultCurrent = 1,
  total = 50,
  pageSize = 10,
  queryParams,
  setQueryParams,
}: PaginationAntdProps) => {
  const handleChangePageSize = (current: number, pageSize: number) => {
    console.log("current:", current);
    console.log("pageSize:", pageSize);
    setQueryParams({
      ...queryParams,
      page: current,
      items_per_page: pageSize,
    });
  };

  return (
    <Flex justify="flex-end">
      <Pagination
        defaultCurrent={defaultCurrent}
        total={total}
        pageSize={pageSize}
        onChange={handleChangePageSize}
      />
    </Flex>
  );
};

export default PaginationAntd;
