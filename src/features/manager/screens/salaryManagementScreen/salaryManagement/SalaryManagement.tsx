import { Card, Flex, Tag, Typography } from "antd";
import ExcelComponent from "../benefitsManagementScreen/ExcelComponent";
import { useEffect, useMemo, useState } from "react";
import { UserDetail } from "../../../../../common/common.type";
import { INIT_USER } from "../../../../../common/common.constant";
import { AttendanceData } from "../../../constants/manager.type";
import { getUsers } from "../../../../../api/apiServices";
import { getNowMonth, getNowYear } from "../../../constants/manager.help";
import EnteredPayrollTable from "./enteredPayrollTable/EnteredPayrollTable";
import PaidPayrollTable from "./paidPayrollTable/PaidPayrollTable";
import UnpaidPayrollTable from "./unpaidPayrollTable/UnpaidPayrollTable";

const { Text, Title } = Typography;
const SalaryManagement = () => {
  const [excelData, setExcelData] = useState<any>([]);
  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);

  const [reset, setReset] = useState<Boolean>(false);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const usersApi = res.data.data;
      setUsers(usersApi);
    }
  };

  useEffect(() => {
    fetchUsers();
    setReset(false);
  }, [reset]);

  const attendanceData = useMemo(() => {
    const excelTableData = excelData.filter(
      (excelDatum: any) => excelDatum.employeeId > 0
    );

    const standardWorkDays = excelTableData[0]?.standardWorkDays || 0;
    return excelTableData.map((excelTableDatum: any) => ({
      employeeId: excelTableDatum.employeeId,
      employeeName: excelTableDatum.employeeName,
      compensatoryLeave: excelTableDatum.compensatoryLeave,
      annualLeave: excelTableDatum.annualLeave,
      sickLeave: excelTableDatum.sickLeave,
      publicHoliday: excelTableDatum.publicHoliday,
      leaveOfAbsence: excelTableDatum.leaveOfAbsence,
      unpaidLeave: excelTableDatum.unpaidLeave,
      attendance: excelTableDatum.attendance,
      standardWorkDays: standardWorkDays,
      bonus: excelTableDatum.bonus,
    }));
  }, [excelData]) as AttendanceData[];

  const unCorrectData = useMemo(() => {
    return attendanceData.filter((attendanceDatum) => {
      const user = users.find(
        (user) => user.userId === attendanceDatum.employeeId
      );

      return !user || user.fullName !== attendanceDatum.employeeName;
    });
  }, [attendanceData, users]);

  const unpaidPayrolls = useMemo(() => {
    return users.filter(
      (user) =>
        !user.salaryHistories?.find((salaryHistory) => {
          return (
            salaryHistory.month === getNowMonth() &&
            salaryHistory.year === getNowYear()
          );
        })
    );
  }, [users, attendanceData]);
  const paidPayrolls = useMemo(() => {
    return users.filter(
      (user) =>
        !!user.salaryHistories?.find((salaryHistory) => {
          return (
            salaryHistory.month === getNowMonth() &&
            salaryHistory.year === getNowYear()
          );
        })
    );
  }, [users, attendanceData]);
  const enteredPayrolls = useMemo(() => {
    return attendanceData.filter((attendanceDatum) => {
      return !!unpaidPayrolls.find(
        (unpaidPayroll) => unpaidPayroll.userId === attendanceDatum.employeeId
      );
    });
  }, [users, attendanceData]);

  return (
    <Flex vertical gap={12}>
      <Card title="Nhập lương tháng X">
        {excelData.length > 0 ? (
          unCorrectData.length > 0 ? (
            <div>
              <Title level={5} style={{ textAlign: "left" }}>
                Dữ liệu nhập từ excel của bạn không chính xác. Các nhân viên sau
                chưa có tên trong danh nhân viên trên hệ thống:
              </Title>
              <Flex wrap>
                {unCorrectData.slice(0, 5).map((unCorrectDatum) => {
                  return <Tag> {unCorrectDatum.employeeName}</Tag>;
                })}
              </Flex>
              <ExcelComponent setExcelData={setExcelData} />
            </div>
          ) : (
            <EnteredPayrollTable
              setReset={setReset}
              reset={reset}
              users={users}
              attendanceData={enteredPayrolls}
            />
          )
        ) : (
          <Typography>
            <Text>
              Chưa có thống kê lương, vui lòng nhập file csv/xlsx chấm công vào
              đây để tính lương
            </Text>
            <ExcelComponent setExcelData={setExcelData} />
          </Typography>
        )}
      </Card>
      <Card title="Bảng lương đã kết toán tháng X ">
        <PaidPayrollTable
          setReset={setReset}
          reset={reset}
          users={paidPayrolls}
        />
      </Card>
      <Card title="Bảng nhân viên chưa được kết toán lương  tháng X">
        <UnpaidPayrollTable users={unpaidPayrolls} />
      </Card>
    </Flex>
  );
};
export default SalaryManagement;
