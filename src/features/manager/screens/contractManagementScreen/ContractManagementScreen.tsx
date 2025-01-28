import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const ContractManagementScreen = () => {
  return (
    <Flex vertical>
      <Outlet />
    </Flex>
  );
};
export default ContractManagementScreen;
