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
import { useTranslation } from "react-i18next";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import { managerPaths } from "../../../constants/constant.path";

const { Text, Title } = Typography;
const SalaryManagement = () => {
  const { t } = useTranslation();

  const [excelData, setExcelData] = useState<any>([]);
  const [users, setUsers] = useState<UserDetail[]>([INIT_USER]);

  const [reset, setReset] = useState<boolean>(false);

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

  const {
    attendanceData,
    month,
    year,
  }: { attendanceData: AttendanceData[]; month: number; year: number } =
    useMemo(() => {
      const excelTableData = excelData.filter(
        (excelDatum: any) => excelDatum.EMPLOYEE_ID > 0
      );
      let month = null;
      let year = null;
      if (excelData && excelData.length > 0) {
        month = excelData[0].MONTH;
        year = excelData[0].YEAR;
      }

      const standardWorkDays = excelTableData[0]?.STANDARD_WORK_DAYS || 0;
      const filterAttendanceData = excelTableData.map(
        (excelTableDatum: any) => ({
          employeeId: excelTableDatum.EMPLOYEE_ID,
          employeeName: excelTableDatum.EMPLOYEE_NAME,
          compensatoryLeave: excelTableDatum.COMPENSATORY_LEAVE,
          annualLeave: excelTableDatum.ANNUAL_LEAVE,
          sickLeave: excelTableDatum.SICK_LEAVE,
          publicHoliday: excelTableDatum.PUBLIC_HOLIDAY,
          leaveOfAbsence: excelTableDatum.LEAVE_OF_ABSENCE,
          unpaidLeave: excelTableDatum.UNPAID_LEAVE,
          attendance: excelTableDatum.ATTENDANCE,
          standardWorkDays: standardWorkDays,
          bonus: excelTableDatum.BONUS,
        })
      );
      return {
        attendanceData: filterAttendanceData,
        month: month || Number(getNowMonth()) - 1,
        year: year || Number(getNowYear()) - 1,
      };
    }, [excelData]);

  console.log("users:", users);
  console.log("excelData :", excelData);

  console.log("attendanceData:", attendanceData);

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
  }, [users]);
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
  }, [users]);
  const enteredPayrolls = useMemo(() => {
    return attendanceData.filter((attendanceDatum) => {
      return !!unpaidPayrolls.find(
        (unpaidPayroll) => unpaidPayroll.userId === attendanceDatum.employeeId
      );
    });
  }, [attendanceData, unpaidPayrolls]);

  console.log("excelData:", excelData);
  console.log("attendanceData:", attendanceData);

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.SALARY_MANAGEMENT}`}>
                  {t("content.feature.SalaryManagement")}
                </a>
              </div>
            ),
          },
        ]}
      />

      {month ? (
        <Flex vertical gap={12}>
          <Card title={`${t("content.salary.MonthlyPayroll")} ${month}`}>
            {excelData.length > 0 ? (
              unCorrectData.length > 0 ? (
                <div>
                  <Title level={5} style={{ textAlign: "left" }}>
                    Dữ liệu nhập từ excel của bạn không chính xác. Các nhân viên
                    sau chưa có tên trong danh nhân viên trên hệ thống:
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
                  month={month}
                  year={year}
                />
              )
            ) : (
              <Typography>
                <Text>
                  Chưa có thống kê lương, vui lòng nhập file csv/xlsx chấm công
                  vào đây để tính lương
                </Text>
                <ExcelComponent setExcelData={setExcelData} />
              </Typography>
            )}
          </Card>
          <Card title={`${t("content.salary.MonthlyClosedPayroll")} ${month}`}>
            <PaidPayrollTable
              setReset={setReset}
              reset={reset}
              users={paidPayrolls}
            />
          </Card>
          <Card
            title={`${t(
              "content.salary.StaffTableForUnclosedMonthlyPayroll"
            )} ${month}`}
          >
            <UnpaidPayrollTable users={unpaidPayrolls} />
          </Card>
        </Flex>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default SalaryManagement;
