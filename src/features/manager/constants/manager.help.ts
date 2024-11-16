import { SelectProps } from "antd";

import { ColumnFilterItem } from "antd/es/table/interface";
import {
  dayOfWeekVN,
  departmentName,
  notificationName,
  positionName,
} from "../../../common/common.constant";
import {
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
