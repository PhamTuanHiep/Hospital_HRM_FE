import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const ScheduleManagementScreen = () => {
  return (
    <Flex vertical>
      <Outlet />
    </Flex>
  );
};
export default ScheduleManagementScreen;
