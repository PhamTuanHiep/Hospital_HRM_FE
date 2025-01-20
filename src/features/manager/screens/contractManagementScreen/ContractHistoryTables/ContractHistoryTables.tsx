import { Button, Card, Flex } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  getContractHistories,
  getContracts,
} from "../../../../../api/apiServices";
import {
  ContractDetail,
  ContractHistoryDetail,
} from "../../../../../common/common.type";
import {
  INIT_CONTRACT,
  INIT_CONTRACT_HISTORY,
} from "../../../../../common/common.constant";
import TableComponent from "../../../../../components/tableComponent/TableComponent";
import { useTranslation } from "react-i18next";
import "./ContractHistoryTables.scss";
import { formatDateToDDMMYYYY } from "../../../../../common/common.helper";

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
      console.log("contractHistoriesApi:", contractHistoriesApi);
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchContractHistories();
  }, []);

  const contractTypes = useMemo(() => {
    return contracts;
  }, [contracts]);

  const contractTableColumn = [
    {
      title: t("content.salary.UserId"),
      dataIndex: "userId",
      width: 150,
      isSorter: true,
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
      render: (value: string) => formatDateToDDMMYYYY(value),
    },
    {
      title: t("content.contract.EndDay"),
      dataIndex: "endDay",
      width: 150,
      render: (value: string) => formatDateToDDMMYYYY(value),
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
      render: (value: Date) => formatDateToDDMMYYYY(value),
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      width: 150,
      render: (value: Date) => formatDateToDDMMYYYY(value),
    },
    {
      dataIndex: "actions",
      className: "title_content-center",
      render: (value: ContractHistoryDetail) => {
        console.log("value:", value);
        return (
          <Flex justify="space-between" gap={8}>
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
          (contractHistory) => ({
            userId: contractHistory.user?.userId,
            fullName: contractHistory.user?.fullName,
            startDay: contractHistory.startDay,
            endDay: contractHistory.endDay,
            note: contractHistory.note,
            createdAt: contractHistory.createdAt,
            updatedAt: contractHistory.updatedAt,

            actions: contractHistory,
          })
        );

        return (
          <Card title={contractType.contractNameVI} key={index}>
            <TableComponent
              tableData={contractTableData}
              columnData={contractTableColumn}
            />
          </Card>
        );
      })}
    </Flex>
  );
};

export default ContractHistoryTables;
