import { SelectProps } from "antd";

import { ColumnFilterItem } from "antd/es/table/interface";
import {
  ContractStatus,
  dayOfWeekVN,
  departmentName,
  notificationName,
  positionName,
} from "../../../common/common.constant";
import {
  ContractHistoryDetail,
  EvaluateShortInfo,
  LeaveHistoryDetail,
  UserDetail,
} from "../../../common/common.type";
import dayjs from "dayjs";

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
      value: departmentOption.label,
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
  addMonths?: number
): number => {
  const startTime = dayjs(contractHistory.startDay); // Thời gian bắt đầu
  const x = extractSuspensionMonths(contractHistory.note); //thòi gian được thêm do đình chỉ hđ
  console.log("x:", x);
  console.log("note:", contractHistory.note);

  const endTime = addMonths
    ? dayjs(contractHistory.endDay).add(x, "month")
    : dayjs(contractHistory.endDay); //thời gian kết thúc đã qua điều chỉnh
  const diffDays = endTime.diff(startTime, "days");
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
) => {
  const diffDays = getRemainingTermOfContract(contractHistory);
  if (contractExclusion.includes(contractHistory.status)) {
    return contractHistory.status;
  } else {
    if (diffDays < 0) {
      return ContractStatus.EXPIRED;
    } else if (diffDays < 60) {
      return ContractStatus.RENEWAL_PENDING;
    }
  }
};
