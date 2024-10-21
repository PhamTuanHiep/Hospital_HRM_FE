import { SelectProps } from "antd";

import { ColumnFilterItem } from "antd/es/table/interface";
import {
  dayOfWeekVN,
  departmentName,
  positionName,
} from "../../../common/common.constant";
import {
  EvaluateDetail,
  EvaluateShortInfo,
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
