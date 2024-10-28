import { useEffect } from "react";
import { getContractHistories } from "../../../../api/apiServices";
import { Flex } from "antd";
import ContractHistoryTable from "./contractHistoryTable/ContractHistoryTable";

const ContractManagementScreen = () => {
  useEffect(() => {
    fetchContracts();
  }, []);
  const fetchContracts = async () => {
    const res = await getContractHistories();
    if (res) {
      const contractHistoriesApi = res.data.data;
      console.log("contractHistoriesApi:", contractHistoriesApi);
    }
  };

  return (
    <Flex vertical>
      <ContractHistoryTable />
    </Flex>
  );
};
export default ContractManagementScreen;
