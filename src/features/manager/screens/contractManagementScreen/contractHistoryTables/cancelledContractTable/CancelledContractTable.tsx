import { useTranslation } from "react-i18next";
import {
  ContractStatus,
  contractStatus,
  INIT_CONTRACT_HISTORY,
  INIT_PAGE_RESPONSE,
  QueryParamsWithListPosts,
} from "../../../../../../common/common.constant";
import {
  CommonQueryParams,
  ContractHistoryDetail,
  PageResponse,
} from "../../../../../../common/common.type";
import { useEffect, useMemo, useState } from "react";
import { getContractHistories } from "../../../../../../api/apiServices";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";
import { ContractTableData } from "../../../../constants/manager.type";
import { formatDateToDDMMYYYY } from "../../../../../../common/common.helper";
import { Button, Card, Flex } from "antd";

interface SignedContractTableProps {
  contractTypeText: string;
  contractTypeTitle: string;
}
const SignedContractTable = ({
  contractTypeText,
  contractTypeTitle,
}: SignedContractTableProps) => {
  const { t } = useTranslation();
  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);

  const [queryParams, setQueryParams] = useState<CommonQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
    search: "",
  });
  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const fetchContractHistories = async () => {
    const res = await getContractHistories(queryParams);
    console.log("res:", res);

    if (res) {
      const { data: contractHistoriesApi, ...pageResponse } = res.data;
      setCustomPageParam(pageResponse);
      setContractHistories(contractHistoriesApi);
    }
  };

  useEffect(() => {
    fetchContractHistories();
  }, [queryParams]);

  const contractTableColumn: ColumnDataCustom<ContractTableData>[] = [
    {
      title: t("content.salary.UserId"),
      dataIndex: "userId",
      width: 150,
      prioritySort: 1,
      render: (value: string, record: ContractTableData) => {
        return (
          <div
            className={contractStatus[record.contractStatus as ContractStatus]}
          >
            {value}
          </div>
        );
      },
    },
    {
      title: t("content.info.FullName"),
      dataIndex: "fullName",
      width: 200,
      prioritySort: 2,
    },
    {
      title: t("content.contract.StartDay"),
      dataIndex: "startDay",
      width: 150,
      render: (value: string) => <div>{formatDateToDDMMYYYY(value)}</div>,
    },
    {
      title: t("content.contract.EndDay"),
      dataIndex: "endDay",
      width: 150,
      render: (value: string) => <div>{formatDateToDDMMYYYY(value)}</div>,
    },
    {
      title: t("content.contract.ContractStatus"),
      dataIndex: "contractStatus",
      width: 200,
      render: (value: number) => {
        return <div>{contractStatus[value as ContractStatus]}</div>;
      },
      filterObjects: [
        {
          text: "Active",
          value: "1",
        },
        {
          text: "Renewal-Pending",
          value: "2",
        },
        {
          text: "Suspended",
          value: "3",
        },
        {
          text: "Terminated",
          value: "4",
        },
        {
          text: "Cancelled",
          value: "5",
        },
        {
          text: "Transferred",
          value: "6",
        },
        {
          text: "Probation",
          value: "7",
        },
      ],
    },
    {
      title: t("content.common.Note"),
      dataIndex: "note",
      width: 200,
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      width: 150,
      render: (value: Date) => <div>{formatDateToDDMMYYYY(value)}</div>,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      width: 150,
      render: (value: Date) => <div>{formatDateToDDMMYYYY(value)}</div>,
    },
    {
      dataIndex: "actions",
      className: "title_content-center",
      render: (value: ContractHistoryDetail) => {
        return (
          <Flex justify="space-between" gap={8} className="actions">
            <Button
              onClick={() => handleUpdateContractHistory(value)}
              type="primary"
            >
              Xóa
              {/* {t("content.common.Update")} */}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const contractTableData = useMemo(() => {
    return contractHistories.map(
      (contractHistory): ContractTableData => ({
        rowId: contractHistory.contractHistoryId,
        userId: contractHistory.user?.userId,
        fullName: contractHistory.user?.fullName,
        startDay: contractHistory.startDay,
        endDay: contractHistory.endDay,
        contractStatus: contractHistory.status,
        note: contractHistory.note,
        createdAt: contractHistory.createdAt,
        updatedAt: contractHistory.updatedAt,
        actions: contractHistory,
      })
    );
  }, [contractHistories]);

  const handleUpdateContractHistory = (contract: ContractHistoryDetail) => {
    alert("up");
  };
  const handleDeleteContractHistory = (contract: ContractHistoryDetail) => {
    alert("up");
  };

  return (
    <Card title={contractTypeTitle}>
      <TableComponent<ContractTableData>
        tableData={contractTableData}
        columnData={contractTableColumn}
        rowClassName={(record) => {
          return contractStatus[record.contractStatus as ContractStatus];
        }}
        itemTotal={customPageParam.total}
        paginationQueryParams={queryParams}
        setPaginationQueryParams={setQueryParams}
      />
    </Card>
  );
};

export default SignedContractTable;
