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

export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    )
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "");
};

export const toSnakeCaseFromCamelCase = (str: string): string => {
  return str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) // Thêm dấu "_" trước ký tự viết hoa và chuyển thành chữ thường
    .replace(/^_/, ""); // Loại bỏ dấu "_" đầu chuỗi nếu có
};

export const increaseMonthToTime = (time: Date, addMonth: number = 3) => {
  return dayjs(time).add(addMonth, "month").toDate();
};

export const reduceMonthToTime = (
  time?: Date | Dayjs,
  reducedMonth: number = 3
) => {
  return dayjs(time).subtract(reducedMonth, "month").toDate();
};

export const getDataSetsByYear = (
  dataSets: CustomDataSets[],
  year?: number
) => {
  if (!year) {
    return dataSets.filter((dataSet) => {
      return (
        dayjs(reduceMonthToTime(dataSet.time)).year() ===
        dayjs(dayjs().toDate()).year()
      );
    });
  } else {
    return dataSets.filter((dataSet) => {
      return dayjs(dataSet.time).year() === year;
    });
  }
};

export const convertToPercentage = (arr: number[]): number[] => {
  const total = arr.reduce((acc, num) => acc + num, 0);

  if (total === 0) {
    throw new Error("Tổng của mảng phải lớn hơn 0 để tính phần trăm.");
  }

  // Chuyển đổi mỗi phần tử thành tỷ lệ phần trăm
  return arr.map((num) => (num / total) * 100);
};

export const convertToPercentageWithEvaluate = (arr: number[]): number[] => {
  // Chuyển đổi mỗi phần tử thành tỷ lệ phần trăm
  return arr.map((num) => (num / 5) * 100);
};
