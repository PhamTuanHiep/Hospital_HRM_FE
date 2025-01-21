import { Button, Card, Flex } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  getContractHistories,
  getContracts,
} from "../../../../../api/apiServices";
import {
  ContractDetail,
  ContractHistoryDetail,
  RowType,
} from "../../../../../common/common.type";
import {
  ContractStatus,
  contractStatus,
  INIT_CONTRACT,
  INIT_CONTRACT_HISTORY,
} from "../../../../../common/common.constant";

import { useTranslation } from "react-i18next";
import "./ContractHistoryTables.scss";
import { formatDateToDDMMYYYY } from "../../../../../common/common.helper";
import { ContractTableData } from "../../../constants/manager.type";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";

const ContractHistoryTables = () => {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState<ContractDetail[]>([INIT_CONTRACT]);
  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);

  const fetchContracts = async () => {
    const res = await getContracts();
    if (res) {
      const contractsApi = res.data.data;
      setContracts(contractsApi);
      // console.log("contractsApi:", contractsApi);
    }
  };
  const fetchContractHistories = async () => {
    const res = await getContractHistories();
    if (res) {
      const contractHistoriesApi = res.data.data;
      setContractHistories(contractHistoriesApi);
      // console.log("contractHistoriesApi:", contractHistoriesApi);
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchContractHistories();
  }, []);

  const contractTypes = useMemo(() => {
    return contracts;
  }, [contracts]);

  const contractTableColumn: ColumnDataCustom<ContractTableData>[] = [
    {
      title: t("content.salary.UserId"),
      dataIndex: "userId",
      width: 150,
      isSorter: true,
      render: (value: string, record: ContractTableData) => {
        // console.log("value:", value);
        // console.log("record:", record);

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
      isSorter: true,
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
        // console.log("value:", value);
        return (
          <Flex justify="space-between" gap={8} className="actions">
            <Button
              onClick={() => handleUpdateContractHistory(value)}
              type="primary"
            >
              Gia hạn
              {/* {t("content.common.Update")} */}
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

  const handleUpdateContractHistory = (contract: ContractHistoryDetail) => {
    alert("up");
  };
  const handleDeleteContractHistory = (contract: ContractHistoryDetail) => {
    alert("up");
  };

  return (
    <Flex id="table-card-list" vertical gap={12}>
      {contractTypes.map((contractType, index) => {
        const contractHistoryClassification = contractHistories.filter(
          (contractHistory) =>
            contractHistory.contract?.contractId === contractType.contractId
        );
        const contractTableData = contractHistoryClassification.map(
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

        return (
          <Card title={contractType.contractNameVI} key={index}>
            <TableComponent<ContractTableData>
              tableData={contractTableData}
              columnData={contractTableColumn}
              rowClassName={(record) => {
                return contractStatus[record.contractStatus as ContractStatus];
              }}
            />
          </Card>
        );
      })}
    </Flex>
  );
};

export default ContractHistoryTables;
