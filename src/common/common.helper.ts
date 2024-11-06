import { CustomDataSets, Overtime, UserDetail } from "./common.type";
import dayjs, { Dayjs } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import isBetween from "dayjs/plugin/isBetween"; // Import plugin từ dayjs
import isoWeek from "dayjs/plugin/isoWeek"; // Import plugin isoWeek
import { DayOfWeek, RoleName, dayOfWeek } from "./common.constant";

dayjs.extend(isBetween);
dayjs.extend(isoWeek);

export const getFormatNumberToString = (num: number, char: string) => {
  let strNum = num.toLocaleString();
  return strNum.split(",").join(char);
};

export const addSuffix = (value: number | string, suffix: string) => {
  return value.toString() + " " + suffix;
};

export const getDDMMYYYYfromISO8601DateString = (date: Date | undefined) => {
  let newDate = date ? date : "";
  return dayjs(newDate).format("DD/MM/YYYY");
};

export const getDayToDaysOfOvertime = (days: string) => {
  return days.split("_")[0];
};

export const getUserNameFromUserId = (userId: number, users: UserDetail[]) => {
  return (
    users.find((user) => {
      return user.userId === userId;
    })?.fullName || ""
  );
};

export const getOvertimeNameFromOvertimeId = (
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

export const transformCamelToTitleCaseHaveSpace = (str: string): string => {
  return str
    .replace(/([A-Z])/g, " $1") // Thêm dấu cách trước mỗi ký tự viết hoa
    .replace(/^./, (firstChar) => firstChar.toUpperCase()) // Viết hoa ký tự đầu tiên
    .trim(); // Xóa các dấu cách thừa ở đầu và cuối chuỗi
};

export const transformCamelToPascal = (camelCaseString: string): string => {
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
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

// Hàm kiểm tra tuần
export const checkWeek = (
  dateString: string | Date,
  next?: boolean
): boolean => {
  const date = dayjs(dateString);

  // Lấy ra tuần hiện tại
  const startOfThisWeek = dayjs().startOf("isoWeek").format("YYYY-MM-DD");
  const endOfThisWeek = dayjs().endOf("isoWeek").format("YYYY-MM-DD");

  // Lấy ra tuần sau
  const startOfNextWeek = dayjs()
    .add(1, "week")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");
  const endOfNextWeek = dayjs()
    .add(1, "week")
    .endOf("isoWeek")
    .format("YYYY-MM-DD");

  //default next =false -> check this week
  if (next) {
    // Parameter 4 is a string with two characters; '[' means inclusive, '(' exclusive
    // '()' excludes start and end date (default)
    // '[]' includes start and end date
    // '[)' includes the start date but excludes the stop
    // Granuality offers the precision on start and end inclusive checks.
    // For example including the start date on day precision you should use 'day' as 3r
    return date.isBetween(startOfNextWeek, endOfNextWeek, "day", "[]")
      ? true
      : false;
  } else {
    //The third parameter can be replaced by day or year.
    return date.isBetween(startOfThisWeek, endOfThisWeek, "day", "[]")
      ? true
      : false;
  }
};

export const checkDayOfWeek = (
  dateString: string | Date,
  day: number,
  next?: boolean
): boolean => {
  if (next) {
    if (checkWeek(dateString, next)) {
      return dayjs(dateString).format("dddd") === dayOfWeek[day as DayOfWeek];
    }
  } else {
    if (checkWeek(dateString)) {
      return dayjs(dateString).format("dddd") === dayOfWeek[day as DayOfWeek];
    }
  }
  return false;
};

export const timeStartToEndOfAWeek = (next?: boolean) => {
  let startOfWeek: string = "";
  let endOfWeek: string = "";
  if (next) {
    startOfWeek = dayjs()
      .add(1, "week")
      .startOf("isoWeek")
      .format("DD/MM/YYYY");
    endOfWeek = dayjs().add(1, "week").endOf("isoWeek").format("DD/MM/YYYY");
  } else {
    startOfWeek = dayjs().startOf("isoWeek").format("DD/MM/YYYY");
    endOfWeek = dayjs().endOf("isoWeek").format("DD/MM/YYYY");
  }
  return `(${startOfWeek}-${endOfWeek})`;
};

export const getDayNameFromNumber = (days: number[]) => {
  const dayList = days.join(",");
  return `Các thứ trong tuần: ${dayList}`;
};

export const getDepartmentIdFromNumber = (num: number): string => {
  // Chuyển đổi số thành chuỗi và thêm số 0 vào trước nếu cần để đảm bảo đủ 3 chữ số
  const paddedNumber = num.toString().padStart(3, "0");

  // Trả về chuỗi với tiền tố "D" và số đã được làm tròn thành 3 chữ số
  return `D${paddedNumber}`;
};

export const getPositionIdFromNumber = (num: number): string => {
  // Chuyển đổi số thành chuỗi và thêm số 0 vào trước nếu cần để đảm bảo đủ 3 chữ số
  const paddedNumber = num.toString().padStart(3, "0");

  // Trả về chuỗi với tiền tố "D" và số đã được làm tròn thành 3 chữ số
  return `P${paddedNumber}`;
};

export const findMissingElementInId = (arr: string[], char: string): string => {
  // Lấy phần tử đầu tiên để khởi tạo giá trị mong đợi
  let expectedNumber = parseInt(arr[0].slice(1)); // Lấy phần số của phần tử đầu tiên

  for (let i = 0; i < arr.length; i++) {
    const currentNumber = parseInt(arr[i].slice(1)); // Lấy phần số của phần tử hiện tại

    // Kiểm tra nếu phần số của phần tử hiện tại khác với số mong đợi
    if (currentNumber !== expectedNumber) {
      // Trả về phần tử bị thiếu
      const missingElement = `${char}${expectedNumber
        .toString()
        .padStart(3, "0")}`;
      return missingElement;
    }

    // Cập nhật giá trị mong đợi
    expectedNumber++;
  }

  // Nếu không có phần tử bị thiếu, trả về phần tử tiếp theo
  return `${char}${expectedNumber.toString().padStart(3, "0")}`;
};
export const getLowerRole = (role?: string): string => {
  return role === RoleName.ADMIN ? RoleName.MANAGER : RoleName.USER;
};
