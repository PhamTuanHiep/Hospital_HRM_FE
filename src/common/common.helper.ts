import { Overtime, User } from "./common.type";

export const getFormatNumberToString = (num: number, char: string) => {
  let strNum = num.toLocaleString();
  return strNum.split(",").join(char);
};

export const addSuffix = (value: number | string, suffix: string) => {
  return value.toString() + suffix;
};

export const getDDMMYYYYfromISO8601DateString = (date: Date | undefined) => {
  let newDate = date ? date : "";
  return new Date(newDate).toLocaleString("vi-VN");
};

export const getDayToDaysOfOvertime = (days: string) => {
  return days.split("_")[0];
};

export const getUserfromUserId = (userId: number, users: User[]) => {
  return (
    users.find((user) => {
      return user.userId === userId;
    })?.fullName || ""
  );
};

export const getOvertimeNamefromOvertimeId = (
  overtimeId: string,
  overtimes: Overtime[]
) => {
  return overtimes.find((overtime) => {
    return overtime.overtimeId === overtimeId;
  })?.overtimeName;
};
