import { useTranslation } from "react-i18next";
import {
  ContractStatus,
  contractStatus,
  INIT_CONTRACT_HISTORY,
  INIT_PAGE_RESPONSE,
  QueryParamsWithListPosts,
} from "../../../../../../common/common.constant";
import {
  ContractHistoriesQueryParams,
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
import {
  ContractModalType,
  ContractType,
} from "../../../../constants/manager.constant";
import UpdateContractHistoryModal from "../contractHistoriesModels/updateContractHistoryModal/UpdateContractHistoryModal";

interface SignedContractTableProps {
  contractType: string;
  contractTypeTitle: string;
  isCancelledContractList?: boolean;
}
const SignedContractTable = ({
  contractType,
  contractTypeTitle,
  isCancelledContractList = false,
}: SignedContractTableProps) => {
  const subParams = isCancelledContractList
    ? {
        contractStatus: String(ContractStatus.CANCELLED),
      }
    : {
        excludesStatus: `${ContractStatus.CANCELLED}, ${ContractStatus.TERMINATED}`,
      };

  const { t } = useTranslation();
  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);

  const [contractHistory, setContractHistory] = useState<ContractHistoryDetail>(
    INIT_CONTRACT_HISTORY
  );

  const [queryParams, setQueryParams] = useState<ContractHistoriesQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
    search: contractType,
    ...subParams,
  });
  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [reset, setReset] = useState<boolean>(false);

  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchContractHistories = async () => {
    const res = await getContractHistories(queryParams);
    // console.log("res:", res);

    if (res) {
      const { data: contractHistoriesApi, ...pageResponse } = res.data;
      setCustomPageParam(pageResponse);
      setContractHistories(contractHistoriesApi);
      setReset(false);
    }
  };

  useEffect(() => {
    fetchContractHistories();
  }, [reset, queryParams]);

  const contractTableColumn: ColumnDataCustom<ContractTableData>[] = [
    {
      title: t("content.salary.UserId"),
      dataIndex: "userId",
      width: 150,
      prioritySort: 2,
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
      prioritySort: 1,
    },
    {
      title: t("content.contract.StartDay"),
      dataIndex: "startDay",
      width: 150,
      hidden: !(
        contractType !== ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT &&
        contractType !== ContractType.INDEFINITE_TERM_LABOR_CONTRACT &&
        contractType !== ContractType.PROBATIONARY_CONTRACT
      ),
      render: (value: string) => <div>{formatDateToDDMMYYYY(value)}</div>,
    },
    {
      title: t("content.contract.EndDay"),
      dataIndex: "endDay",
      width: 150,
      hidden: !(
        contractType !== ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT &&
        contractType !== ContractType.INDEFINITE_TERM_LABOR_CONTRACT &&
        contractType !== ContractType.PROBATIONARY_CONTRACT
      ),
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
          <div>
            {isCancelledContractList ? (
              <Button
                onClick={() => handleDeleteContractHistory(value)}
                type="primary"
                danger
              >
                {t("content.contract.Delete")}
              </Button>
            ) : (
              <Flex justify="space-between" gap={8} className="actions">
                {contractType !==
                  ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT &&
                contractType !== ContractType.INDEFINITE_TERM_LABOR_CONTRACT &&
                contractType !== ContractType.PROBATIONARY_CONTRACT ? (
                  <Button
                    onClick={() => handleExtendContractHistory(value)}
                    type="primary"
                  >
                    {t("content.contract.Extend")}
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button
                  onClick={() => handleTerminateContractHistory(value)}
                  type="primary"
                >
                  {t("content.contract.AdjustStatus")}
                </Button>
                <Button
                  onClick={() => handleCancelContractHistory(value)}
                  type="primary"
                  danger
                >
                  {t("content.contract.CancelContractHistory")}
                </Button>
              </Flex>
            )}
          </div>
        );
      },
    },
  ];

  const contractTableData: ContractTableData[] = useMemo(() => {
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

  const handleExtendContractHistory = (
    contractHistory: ContractHistoryDetail
  ) => {
    setContractHistory(contractHistory);
    setIsExtendModalOpen(true);
  };

  const handleTerminateContractHistory = (
    contractHistory: ContractHistoryDetail
  ) => {
    setContractHistory(contractHistory);
    setIsTerminateModalOpen(true);
  };

  const handleCancelContractHistory = (
    contractHistory: ContractHistoryDetail
  ) => {
    setContractHistory(contractHistory);
    setIsCancelModalOpen(true);
  };
  const handleDeleteContractHistory = (
    contractHistory: ContractHistoryDetail
  ) => {
    setContractHistory(contractHistory);
    setIsDeleteModalOpen(true);
  };
  console.log("reset:", reset);
  return (
    <div key={contractType}>
      <Card
        title={contractTypeTitle}
        className={isCancelledContractList ? "Cancelled" : ""}
      >
        <TableComponent<ContractTableData>
          tableData={contractTableData}
          columnData={contractTableColumn}
          onHeaderRow={(columns, index) => {
            // console.log("columns:", columns);
            // console.log("index:", index);
            return isCancelledContractList
              ? {
                  onClick: () => {
                    // console.log("Header row clicked");
                  },
                  className: "Cancelled",
                }
              : {
                  className: "hihi",
                };
          }}
          rowClassName={(record) => {
            return contractStatus[record.contractStatus as ContractStatus];
          }}
          itemTotal={customPageParam.total}
          paginationQueryParams={queryParams}
          setPaginationQueryParams={setQueryParams}
        />
      </Card>
      <UpdateContractHistoryModal
        contractModalType={ContractModalType.EXTEND}
        modalKey={contractHistory.contractHistoryId}
        isModalOpen={isExtendModalOpen}
        setIsModalOpen={setIsExtendModalOpen}
        setReset={setReset}
        contractHistory={contractHistory}
        confirmLoading={!contractHistory}
      />
      <UpdateContractHistoryModal
        modalKey={contractHistory.contractHistoryId}
        isModalOpen={isTerminateModalOpen}
        setIsModalOpen={setIsTerminateModalOpen}
        setReset={setReset}
        contractHistory={contractHistory}
        confirmLoading={!contractHistory}
      />
      <UpdateContractHistoryModal
        contractModalType={ContractModalType.CANCEL}
        modalKey={contractHistory.contractHistoryId}
        isModalOpen={isCancelModalOpen}
        setIsModalOpen={setIsCancelModalOpen}
        setReset={setReset}
        contractHistory={contractHistory}
        confirmLoading={!contractHistory}
      />
      <UpdateContractHistoryModal
        contractModalType={ContractModalType.DELETE}
        modalKey={contractHistory.contractHistoryId}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setReset={setReset}
        contractHistory={contractHistory}
        confirmLoading={!contractHistory}
      />
    </div>
  );
};

export default SignedContractTable;
