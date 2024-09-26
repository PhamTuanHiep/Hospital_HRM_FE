import { CustomDataSets, Overtime, User } from "./common.type";
import dayjs, { Dayjs } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

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

export const getQuarterLabels = (time?: Date) => {
  dayjs.extend(quarterOfYear);
  if (time) {
    const quarter = dayjs(time).quarter() - 1;
    let quarterLabel: string = "";
    if (quarter === 1) {
      quarterLabel = "Quy 1";
    } else if (quarter === 2) {
      quarterLabel = "Quy 2";
    } else if (quarter === 3) {
      quarterLabel = "Quy 3";
    } else {
      quarterLabel = "Quy 4";
    }
    return quarterLabel;
  } else null;
};

export const toPascalCase = (input: string): string => {
  return input
    .toLowerCase() // Chuyển tất cả về chữ thường
    .split(/[\s-_]+/) // Tách chuỗi bằng khoảng trắng, dấu gạch ngang, hoặc dấu gạch dưới
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu tiên của mỗi từ
    .join(""); // Kết hợp lại thành chuỗi PascalCase
};

export const increaseMonthToTime = (time: Date, addMonth: number = 3) => {
  return dayjs(time).add(addMonth, "month").toDate();
};

export const reduceMonthToTime = (
  time: Date | Dayjs,
  reducedMonth: number = 3
) => {
  return dayjs(time).subtract(reducedMonth, "month").toDate();
};

export const getDataSetsByYear = (
  dataSets: CustomDataSets[],
  now?: boolean,
  year?: number
) => {
  console.log("dayjs().year():", dayjs().year());
  console.log("year:", year);

  if (now && !year) {
    return dataSets.filter((dataSet) => {
      return (
        dayjs(dataSet.time).year() ===
        dayjs(reduceMonthToTime(dayjs().toDate())).year()
      );
    });
  } else {
    return dataSets.filter((dataSet) => {
      return dayjs(dataSet.time).year() === year;
    });
  }
};
