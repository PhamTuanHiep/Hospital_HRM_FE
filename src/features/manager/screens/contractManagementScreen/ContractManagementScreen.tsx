import { useEffect } from "react";
import { getContractHistories } from "../../../../api/apiServices";
import { Flex } from "antd";
import ContractHistoryTable from "./contractHistoryTable/ContractHistoryTable";
import ContractTable from "./contractTable/ContractTable";

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
      <ContractTable />
      <ContractHistoryTable />
    </Flex>
  );
};
export default ContractManagementScreen;
