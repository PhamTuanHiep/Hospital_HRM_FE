import { SelectProps } from "antd";

import { ColumnFilterItem } from "antd/es/table/interface";
import {
  ContractStatus,
  dayOfWeekVN,
  departmentName,
  notificationName,
  positionName,
  TIME_FORMATS,
} from "../../../common/common.constant";
import {
  ContractHistoryDetail,
  EvaluateShortInfo,
  LeaveHistoryDetail,
  MedicalTrainingResultsDetail,
  NursingTrainingResults,
  OvertimeDetail,
  UserDetail,
} from "../../../common/common.type";
import dayjs from "dayjs";
import { ContractHistoryPut, OvertimeIdsObject } from "./manager.type";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export const weeklyScheduleOptions: SelectProps["options"] = Object.entries(
  dayOfWeekVN
).map(([key, value]) => {
  return {
    label: value,
    value: Number(key),
  };
});

export const departmentOptions: SelectProps["options"] = Object.entries(
  departmentName
).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

export const positionOptions: SelectProps["options"] = Object.entries(
  positionName
).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

export const filterDepartmentOptions = departmentOptions.map(
  (departmentOption) => {
    return {
      text: departmentOption.label,
      value: departmentOption.value,
    } as ColumnFilterItem;
  }
);

export const filterPositionOptions = positionOptions.map((positionOption) => {
  return {
    text: positionOption.label,
    value: positionOption.label,
  } as ColumnFilterItem;
});

export const notificationOptions = Object.entries(notificationName).map(
  ([key, value]) => {
    return {
      label: value,
      value: key,
    };
  }
);

export interface ResultAccordingYear {
  averageScore: number | null;
  year: number;
}

export const getAverageScoreToObject = (user: UserDetail) => {
  const resultsAccordingYear: ResultAccordingYear[] =
    user.evaluateHistories.map((result) => ({
      averageScore: Number(result.averageScore),
      year: dayjs(result.updatedAt?.toString()).year(),
    }));

  const nowResult: ResultAccordingYear[] = [
    {
      averageScore:
        resultsAccordingYear.find((resultAccordingYear) => {
          return resultAccordingYear.year === dayjs().year();
        })?.averageScore || null,
      year: dayjs().year(),
    },
    {
      averageScore:
        resultsAccordingYear.find((resultAccordingYear) => {
          return resultAccordingYear.year === dayjs().year() - 1;
        })?.averageScore || null,
      year: dayjs().year() - 1,
    },
  ];

  return nowResult.sort((a, b) => b.year - a.year);
};

export const getNowEvaluateHistory = (
  evaluateHistories?: EvaluateShortInfo[]
) => {
  if (evaluateHistories?.length != 0) {
    return evaluateHistories?.find(
      (evaluateHistory) =>
        dayjs(evaluateHistory.updatedAt?.toString()).year() === dayjs().year()
    );
  } else return undefined;
};

export const isUpdateEvaluate = (
  evaluateHistories?: EvaluateShortInfo[]
): boolean => {
  if (evaluateHistories?.length !== 0) {
    return getNowEvaluateHistory(evaluateHistories)?.averageScore !== 0;
  }
  return false;
};

export const getNowTrainingResult = (
  employee: UserDetail,
  positionType: PositionType
): MedicalTrainingResultsDetail | undefined => {
  if (positionType === PositionType.DOCTOR) {
    if (employee.medicalTrainingResults.length != 0) {
      return employee.medicalTrainingResults.find(
        (evaluateHistory) =>
          dayjs(evaluateHistory.updatedAt?.toString()).year() === dayjs().year()
      );
    } else return undefined;
  }
  // if (positionType === PositionType.NURSING) {
  //   if (employee.nursingTrainingResults.length != 0) {
  //     return employee.nursingTrainingResults.find(
  //       (evaluateHistory) =>
  //         dayjs(evaluateHistory.updatedAt?.toString()).year() === dayjs().year()
  //     );
  //   }
  // }
};

export const enum PositionType {
  DOCTOR = 1,
  NURSING,
  OTHER,
}
export const doctorListId: string[] = [
  // Trưởng khoa
  "P001",
  "P002",
  "P003",
  "P004",
  "P005",
  "P006",
  "P007",
  "P008",
  "P009",
  "P010",
  "P011",
  "P012",
  "P013",
  "P014",
  "P015",
  "P016",
  "P017",
  "P018",

  // Phó trưởng khoa
  "P019",
  "P020",
  "P021",
  "P022",
  "P023",
  "P024",
  "P025",
  "P026",
  "P027",
  "P028",
  "P029",
  "P030",
  "P031",
  "P032",
  "P033",
  "P034",

  // Bác sĩ
  "P045",
  "P046",
  "P047", // Bác sĩ đa khoa
  "P048",
  "P049",
  "P050", // Bác sĩ chuyên khoa
  "P051",
  "P052",
  "P053", // Bác sĩ nội trú
  "P054",
  "P055",
  "P056", // Bác sĩ phẫu thuật
  "P057", // Bác sĩ dinh dưỡng

  // Dược sĩ
  "P061",
  "P062", // Dược sĩ lâm sàng, Dược sĩ kiểm soát thuốc
];
export const nursingListId: string[] = ["P057", "P058", "P059", "P063"];

export const checkPosition = (employee: UserDetail): number => {
  const mockMedicalId = [...doctorListId, ...nursingListId];
  const positionId = employee.position?.positionId || "";
  if (mockMedicalId.includes(positionId)) {
    return 1; //medical
  }
  if (nursingListId.includes(positionId)) {
    return 2; //nursing
  } else return 3; //other
};

export const getNowMonth = (): string => {
  return (dayjs().month() + 1).toString();
};

export const getNowYear = (): string => {
  return dayjs().year().toString();
};

//tong so ngay da nghi
export const getTotalNumberOfDaysOff = (
  leaveHistories: LeaveHistoryDetail[],
  userId: number
): number => {
  const myLeaveHistories = leaveHistories.filter(
    (leaveHistory) => leaveHistory.user?.userId === userId
  );
  const totalDaysOff = myLeaveHistories.reduce(
    (total, currentMyLeaveHistory) =>
      total + currentMyLeaveHistory.numOfDaysOff,
    0
  );
  return totalDaysOff;
};

//so ngay co the nghi
export const getTotalNumberOfAllowableDaysOff = (user: UserDetail): number => {
  const startMonth = dayjs(user.createdAt).month() + 1;
  const startYear = dayjs(user.createdAt).year();
  const nowMonth = Number(getNowMonth());
  const nowYear = Number(getNowYear());
  let countDaysOff = 0;
  if (startYear === nowYear) {
    countDaysOff = nowMonth - startMonth + 1;
  } else {
    countDaysOff = nowMonth;
  }
  return countDaysOff;
};

export interface NumberOfDaysOffTypes {
  paidLeave: number;
  unpaidLeave: number;
  numOfDaysOff: number;
}

export const getNumberOfDaysOffTypes = (
  leaveHistories: LeaveHistoryDetail[],
  user: UserDetail,
  numOfDaysOff: number
): NumberOfDaysOffTypes => {
  const totalNumberOfDaysOff = getTotalNumberOfDaysOff(
    leaveHistories,
    user.userId
  );
  const totalNumberOfAllowableDaysOff = getTotalNumberOfAllowableDaysOff(user);
  let paidLeave = 0;
  let unpaidLeave = 0;
  const difference = totalNumberOfAllowableDaysOff - totalNumberOfDaysOff;
  if (difference) {
    if (numOfDaysOff > difference) {
      paidLeave = difference;
      unpaidLeave = numOfDaysOff - difference;
    } else {
      paidLeave = numOfDaysOff;
      unpaidLeave = 0;
    }
  } else {
    paidLeave = 0;
    unpaidLeave = numOfDaysOff;
  }
  return {
    paidLeave,
    unpaidLeave,
    numOfDaysOff,
  };
};

// tạo text với số tháng được thêm
export const generateSuspensionText = (x: number): string => {
  return `Tạm đình chỉ ${x} tháng`;
};

// lấy ra số tháng được thêm
export const extractSuspensionMonths = (text: string): number => {
  const match = text.match(/Tạm đình chỉ (\d+) tháng/);
  return match ? parseInt(match[1], 10) : 0;
};

//hàm lấy ra thời hạn còn lại của hđ
export const getRemainingTermOfContract = (
  contractHistory: ContractHistoryDetail,
  addDays?: number
): number => {
  const nowTime = dayjs().tz("Asia/Ho_Chi_Minh");
  const x = contractHistory.suspensionTime; //thòi gian được thêm do tam dung hđ
  const endTime = addDays
    ? dayjs(contractHistory.endDay, TIME_FORMATS).add(x, "day")
    : dayjs(contractHistory.endDay, TIME_FORMATS); //thời gian kết thúc đã qua điều chỉnh
  const diffDays = endTime.diff(nowTime, "day");
  return diffDays || 999;
};

const contractExclusion = [
  ContractStatus.EXPIRED,
  ContractStatus.CANCELLED,
  ContractStatus.TRANSFERRED,
];

//tạo ra trạng thái mới cho các hđ
export const getNewStatusContractHistory = (
  contractHistory: ContractHistoryDetail
): number => {
  if (contractExclusion.includes(contractHistory.status)) {
    return contractHistory.status;
  } else {
    const diffDays = getRemainingTermOfContract(contractHistory);
    if (diffDays < 0) {
      return ContractStatus.EXPIRED;
    } else if (diffDays < 60) {
      return ContractStatus.RENEWAL_PENDING;
    } else {
      return contractHistory.status;
    }
  }
};

export const updateStatusInContractHistories = (
  contractHistories: ContractHistoryDetail[]
): ContractHistoryPut[] => {
  return contractHistories.map((contractHistory) => {
    return {
      contractHistoryId: contractHistory.contractHistoryId,
      userId: contractHistory.user.userId,
      contractId: contractHistory.contract.contractId,
      startDay: contractHistory.startDay,
      endDay: contractHistory.endDay,
      note: contractHistory.note,
      suspensionTime: contractHistory.suspensionTime,
      status: getNewStatusContractHistory(contractHistory),
    };
  });
};

export const isDateInRange = (
  dateString: string,
  month: number,
  year: number
): boolean => {
  const inputDate = dayjs(dateString, TIME_FORMATS);

  // Tạo đối tượng Day.js cho ngày 24 của tháng được chỉ định
  const endDate = dayjs(`${year}-${month}-25`, TIME_FORMATS);

  // Tạo đối tượng Day.js cho ngày 25 của tháng trước
  const startDate = endDate.subtract(1, "month").date(24);

  // Kiểm tra xem inputDate có nằm trong khoảng từ startDate đến endDate hay không
  return inputDate.isAfter(startDate) && inputDate.isBefore(endDate);
};

export const calculateOvertimeCost = (
  overtimeIds: OvertimeIdsObject[],
  overtimes: OvertimeDetail[]
): number => {
  let totalOvertimeCost = 0;
  overtimeIds.map((overtimeObject) => {
    const overtime = overtimes.find(
      (overtime) => overtime.overtimeId === overtimeObject.overtimeId
    );
    totalOvertimeCost = totalOvertimeCost + (overtime?.overtimePay || 0);
  });
  return totalOvertimeCost;
};
