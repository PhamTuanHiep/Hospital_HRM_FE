import { useEffect } from "react";
import { getContractHistories } from "../../../../api/apiServices";
import { Flex } from "antd";
import ContractHistoryTables from "./ContractHistoryTables/ContractHistoryTables";

const ContractManagementScreen = () => {
  // useEffect(() => {
  //   fetchContracts();
  // }, []);
  // const fetchContracts = async () => {
  //   const res = await getContractHistories();
  //   if (res) {
  //     const contractHistoriesApi = res.data.data;
  //     console.log("contractHistoriesApi:", contractHistoriesApi);
  //   }
  // };

  return (
    <Flex vertical>
      <ContractHistoryTables />
    </Flex>
  );
};
export default ContractManagementScreen;
