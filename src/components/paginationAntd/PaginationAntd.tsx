import { Flex, Pagination } from "antd";
import { CommonQueryParams } from "../../common/common.type";
interface PaginationAntdProps {
  total?: number;
  queryParams: CommonQueryParams;
  setQueryParams: Function;
}
const PaginationAntd = ({
  total = 50,
  queryParams,
  setQueryParams,
}: PaginationAntdProps) => {
  const handleChangePageSize = (current: number, pageSize: number) => {
    // console.log("current:", current);
    // console.log("pageSize:", pageSize);
    setQueryParams({
      ...queryParams,
      page: current,
      items_per_page: pageSize,
    });
  };

  return (
    <Flex justify="flex-end">
      <Pagination
        defaultCurrent={queryParams.page || 1}
        total={total}
        pageSize={queryParams.items_per_page || 10}
        onChange={handleChangePageSize}
      />
    </Flex>
  );
};

export default PaginationAntd;
