import { Flex } from "antd";
import ContractHistoryTables from "./ContractHistoryTables/ContractHistoryTables";

const ContractManagementScreen = () => {
  return (
    <Flex vertical>
      <ContractHistoryTables />
    </Flex>
  );
};
export default ContractManagementScreen;
