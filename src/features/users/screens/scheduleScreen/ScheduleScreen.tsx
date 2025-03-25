import { Flex } from "antd";
import "./ScheduleScreen.scss";

import OvertimeScheduleTable from "./overtimeScheduleTable/OvertimeScheduleTable";
import AssignmentByRegulationTable from "./assignmentByRegulationTable/AssignmentByRegulationTable";

const ScheduleScreen = () => {
  return (
    <Flex id="schedule-screen" vertical gap={18}>
      <OvertimeScheduleTable />
      <AssignmentByRegulationTable />
    </Flex>
  );
};
export default ScheduleScreen;
