import { Flex } from "antd";
import "./ScheduleScreen.scss";

import OvertimeScheduleTable from "./overtimeScheduleTable/OvertimeScheduleTable";
import AssignmentByRegulationTable from "./assignmentByRegulationTable/AssignmentByRegulationTable";

const ScheduleScreen = () => {
  return (
    <Flex id="benefits-screen" vertical gap={18}>
      <AssignmentByRegulationTable />
      <OvertimeScheduleTable />
    </Flex>
  );
};
export default ScheduleScreen;
