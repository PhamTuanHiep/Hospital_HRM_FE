import { Flex } from "antd";
import "./ScheduleScreen.scss";

import OvertimeScheduleTable from "./overtimeScheduleTable/OvertimeScheduleTable";
import AssignmentByRegulationTable from "./assignmentByRegulationTable/AssignmentByRegulationTable";
import dayjs from "dayjs";

const ScheduleScreen = () => {
  const today = "2024-09-24 09:34:30.898896";
  const otherDay = "2024-8-24";
  console.log("get day of week:", dayjs(today).format("dddd"));
  console.log("add 1 day by now ", dayjs().add(1, "days").format("YYYY-MM-DD"));
  console.log("add 1 day ", dayjs(today).add(1, "days").format("YYYY-MM-DD"));
  console.log("compare time", dayjs(today).isBefore(otherDay));
  console.log(
    "change day format by now",
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  console.log("change day format:", dayjs(today).format("YYYY-MM-DD HH:mm:ss"));

  return (
    <Flex id="schedule-screen" vertical gap={18}>
      <OvertimeScheduleTable />
      <AssignmentByRegulationTable />
    </Flex>
  );
};
export default ScheduleScreen;
