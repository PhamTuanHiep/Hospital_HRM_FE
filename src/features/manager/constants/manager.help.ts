import { SelectProps } from "antd";

import { ColumnFilterItem } from "antd/es/table/interface";
import {
  dayOfWeekVN,
  departmentName,
  positionName,
} from "../../../common/common.constant";

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
